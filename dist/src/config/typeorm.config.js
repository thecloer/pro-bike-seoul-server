"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmModuleOptions = void 0;
const config_1 = require("@nestjs/config");
const path_1 = require("path");
exports.typeOrmModuleOptions = {
    useFactory: async (configService) => ({
        type: 'postgres',
        host: configService.get('PGIS_HOST'),
        port: configService.get('PGIS_PORT'),
        username: configService.get('PGIS_USERNAME'),
        password: configService.get('PGIS_PASSWORD'),
        database: configService.get('PGIS_NAME'),
        entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
        autoLoadEntities: true,
        keepConnectionAlive: true,
        synchronize: false,
        logging: true,
    }),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=typeorm.config.js.map