"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const station_entity_1 = require("./entities/station.entity");
const seoul_bike_api_service_1 = require("../external-api/seoul-bike-api.service");
const helpers_1 = require("../lib/helpers");
const cache_manager_1 = require("@nestjs/cache-manager");
let StationsService = class StationsService {
    constructor(stationRepository, seoulBikeApiService, cacheManager) {
        this.stationRepository = stationRepository;
        this.seoulBikeApiService = seoulBikeApiService;
        this.cacheManager = cacheManager;
    }
    async getStationsWithStatus(centerCoordinates, count) {
        try {
            const stationsNearby = await this.getNearestStations(centerCoordinates, count);
            const apiIndexes = stationsNearby.map(({ apiIndx }) => apiIndx);
            const cachedStatusOrUndefined = await this.cacheManager.store.mget(...apiIndexes.map(String));
            const uncachedApiIndexes = apiIndexes.filter((_, i) => !cachedStatusOrUndefined[i]);
            const cachedStatus = cachedStatusOrUndefined.filter((s) => s);
            const seoulBikeApiRequestIndexes = (0, helpers_1.makeSeoulBikeApiIndexes)(uncachedApiIndexes);
            const newStatusPromises = seoulBikeApiRequestIndexes.map(({ startIdx, endIdx }) => this.seoulBikeApiService
                .getStatus(startIdx, endIdx)
                .then((results) => {
                const newCacheEntries = Array.from({ length: endIdx - startIdx + 1 }, (_, i) => [String(startIdx + i), results[i]]);
                this.cacheManager.store.mset(newCacheEntries);
                return results;
            }));
            const settledNewStatus = await Promise.allSettled(newStatusPromises);
            const newStatus = settledNewStatus
                .filter(helpers_1.isFullFilled)
                .flatMap(({ value }) => value);
            const status = [...cachedStatus, ...newStatus];
            const stationsWithStatus = stationsNearby.map(({ stationId, lat, lng, address, addressName }) => {
                var _a;
                const { stationName, rackTotCnt, parkingBikeTotCnt } = (_a = status.find((status) => status.stationId === stationId)) !== null && _a !== void 0 ? _a : { stationName: '', rackTotCnt: 0, parkingBikeTotCnt: 0 };
                return {
                    lat,
                    lng,
                    stationId,
                    address,
                    addressName,
                    stationName,
                    rackCount: Number(rackTotCnt),
                    availableBikeCount: Number(parkingBikeTotCnt),
                };
            });
            return stationsWithStatus;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error in getStationsWithStatus');
        }
    }
    getNearestStations(coordinates, count) {
        try {
            return this.stationRepository.findNearest(coordinates, count);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error in getNearestStations');
        }
    }
};
StationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(station_entity_1.StationEntity)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, seoul_bike_api_service_1.SeoulBikeApiService, Object])
], StationsService);
exports.StationsService = StationsService;
//# sourceMappingURL=stations.service.js.map