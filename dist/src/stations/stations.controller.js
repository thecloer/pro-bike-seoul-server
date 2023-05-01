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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationsController = void 0;
const common_1 = require("@nestjs/common");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const getStationsWithStatus_query_dto_1 = require("./dto/getStationsWithStatus-query.dto");
const stations_service_1 = require("./stations.service");
let StationsController = class StationsController {
    constructor(stationsService) {
        this.stationsService = stationsService;
    }
    getStationsByCenter(stationsByCenterDto) {
        const { count } = stationsByCenterDto, centerCoords = __rest(stationsByCenterDto, ["count"]);
        return this.stationsService.getStationsWithStatus(centerCoords, count);
    }
};
__decorate([
    (0, common_1.Get)('nearby'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getStationsWithStatus_query_dto_1.GetStationsWithStatus]),
    __metadata("design:returntype", void 0)
], StationsController.prototype, "getStationsByCenter", null);
StationsController = __decorate([
    (0, common_1.Controller)('stations'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    __metadata("design:paramtypes", [stations_service_1.StationsService])
], StationsController);
exports.StationsController = StationsController;
//# sourceMappingURL=stations.controller.js.map