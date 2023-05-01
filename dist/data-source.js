"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('PGIS_HOST'),
    port: configService.get('PGIS_PORT'),
    username: configService.get('PGIS_USERNAME'),
    password: configService.get('PGIS_PASSWORD'),
    database: configService.get('PGIS_NAME'),
    entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
    dropSchema: true,
    synchronize: true,
});
//# sourceMappingURL=data-source.js.map