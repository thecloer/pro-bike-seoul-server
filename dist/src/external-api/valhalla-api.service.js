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
exports.ValhallaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
let ValhallaService = class ValhallaService {
    constructor(configService, http) {
        this.configService = configService;
        this.http = http;
        this.URL = this.configService.get('VALHALLA_API_URL');
    }
    getRoute(locations) {
        const url = new URL('/route', this.URL);
        url.searchParams.append('json', JSON.stringify({
            locations: locations.map(({ lat, lon }) => ({
                lat,
                lon,
                test: 'test',
            })),
            costing: 'bicycle',
            costing_options: {
                bicycle: {
                    bicycle_type: 'Hybrid',
                    use_roads: 0.5,
                    use_hills: 0.5,
                    use_ferry: 0.5,
                    use_living_streets: 0.5,
                    use_bad_surface: 0.5,
                    maneuver_penalty: 5,
                },
            },
            directions_options: {
                units: 'kilometers',
                language: 'ko-KR',
                directions_type: 'instructions',
            },
        }));
        return this.http.axiosRef
            .get(url.toString(), {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.data);
    }
};
ValhallaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], ValhallaService);
exports.ValhallaService = ValhallaService;
//# sourceMappingURL=valhalla-api.service.js.map