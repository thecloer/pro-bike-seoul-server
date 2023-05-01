"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const typeorm_1 = require("@nestjs/typeorm");
const stations_module_1 = require("./stations/stations.module");
const typeorm_config_1 = require("./config/typeorm.config");
const defaultValues_1 = require("./config/defaultValues");
const routes_module_1 = require("./routes/routes.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string()
                        .valid('development', 'production')
                        .default('development'),
                    PORT: Joi.number().default(defaultValues_1.DEFAULT_PORT),
                    PGIS_USERNAME: Joi.string().required(),
                    PGIS_PASSWORD: Joi.string().required(),
                    PGIS_HOST: Joi.string().required(),
                    PGIS_PORT: Joi.number().required(),
                    PGIS_NAME: Joi.string().required(),
                    SEOUL_BIKE_API_KEY: Joi.string().required(),
                    VALHALLA_API_URL: Joi.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmModuleOptions),
            stations_module_1.StationsModule,
            routes_module_1.RoutesModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map