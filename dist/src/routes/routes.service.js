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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
const stations_service_1 = require("../stations/stations.service");
const valhalla_api_service_1 = require("../external-api/valhalla-api.service");
let RoutesService = class RoutesService {
    constructor(stationsService, valhallaService) {
        this.stationsService = stationsService;
        this.valhallaService = valhallaService;
    }
    async makeDirections(origin, destination) {
        try {
            const stationPromises = await Promise.allSettled([
                this.stationsService.getStationsWithStatus(origin, 20),
                this.stationsService.getNearestStations(destination, 1),
            ]);
            const [stationsNearOrigin, [destinationStation]] = stationPromises.map((promise) => {
                if (promise.status === 'fulfilled')
                    return promise.value;
                throw new common_1.InternalServerErrorException(promise.reason);
            });
            const originStation = stationsNearOrigin.find(({ availableBikeCount }) => availableBikeCount > 0);
            if (!originStation)
                throw new common_1.HttpException('No available bikes', common_1.HttpStatus.NOT_FOUND);
            if (!destinationStation)
                throw new common_1.HttpException('No destination station', common_1.HttpStatus.NOT_FOUND);
            const points = [
                origin,
                originStation,
                destinationStation,
                destination,
            ].map((station) => ({
                lat: station.lat,
                lon: station.lng,
            }));
            return await this.valhallaService.getRoute(points);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error in makeDirections');
        }
    }
};
RoutesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stations_service_1.StationsService,
        valhalla_api_service_1.ValhallaService])
], RoutesService);
exports.RoutesService = RoutesService;
//# sourceMappingURL=routes.service.js.map