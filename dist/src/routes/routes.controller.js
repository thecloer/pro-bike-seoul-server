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
exports.RoutesController = void 0;
const common_1 = require("@nestjs/common");
const routes_service_1 = require("./routes.service");
const getDirections_body_dto_1 = require("./dto/getDirections-body.dto");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const helpers_1 = require("../lib/helpers");
let RoutesController = class RoutesController {
    constructor(routesService) {
        this.routesService = routesService;
    }
    async getDirections({ origin, destination }) {
        const res = await this.routesService.makeDirections(origin, destination);
        if ('error' in res)
            throw new common_1.HttpException(res.error, res.status_code);
        return (0, helpers_1.valhallaDataFormatter)(res.trip);
    }
};
__decorate([
    (0, common_1.Post)('directions'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getDirections_body_dto_1.GetDirectionsDto]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getDirections", null);
RoutesController = __decorate([
    (0, common_1.Controller)('routes'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    __metadata("design:paramtypes", [routes_service_1.RoutesService])
], RoutesController);
exports.RoutesController = RoutesController;
//# sourceMappingURL=routes.controller.js.map