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
exports.SeoulBikeApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const seoul_bike_api_type_1 = require("./types/seoul-bike-api.type");
const rxjs_1 = require("rxjs");
const isSuccess = (response) => seoul_bike_api_type_1.SEOUL_BIKE_API_RESULTS.SUCCESS.some(({ CODE }) => CODE === response.RESULT.CODE);
let SeoulBikeApiService = class SeoulBikeApiService {
    constructor(configService, http) {
        this.configService = configService;
        this.http = http;
        this.makeUrl = (startIdx, endIdx) => `http://openapi.seoul.go.kr:8088/${this.configService.get('SEOUL_BIKE_API_KEY')}/json/bikeList/${startIdx}/${endIdx}`;
    }
    getStatus(startIdx, endIdx) {
        return (0, rxjs_1.lastValueFrom)(this.http
            .get(this.makeUrl(startIdx, endIdx))
            .pipe((0, rxjs_1.map)((res) => {
            const response = res.data.rentBikeStatus;
            if (isSuccess(response))
                return response.row;
            throw new common_1.HttpException(response.RESULT.MESSAGE, common_1.HttpStatus.EXPECTATION_FAILED);
        }))
            .pipe((0, rxjs_1.catchError)(() => {
            throw new common_1.HttpException('Seoul Bike API Error', common_1.HttpStatus.BAD_REQUEST);
        })));
    }
};
SeoulBikeApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], SeoulBikeApiService);
exports.SeoulBikeApiService = SeoulBikeApiService;
//# sourceMappingURL=seoul-bike-api.service.js.map