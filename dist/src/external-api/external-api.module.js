"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalApiModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const seoul_bike_api_service_1 = require("./seoul-bike-api.service");
const valhalla_api_service_1 = require("./valhalla-api.service");
let ExternalApiModule = class ExternalApiModule {
};
ExternalApiModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [seoul_bike_api_service_1.SeoulBikeApiService, valhalla_api_service_1.ValhallaService],
        exports: [seoul_bike_api_service_1.SeoulBikeApiService, valhalla_api_service_1.ValhallaService],
    })
], ExternalApiModule);
exports.ExternalApiModule = ExternalApiModule;
//# sourceMappingURL=external-api.module.js.map