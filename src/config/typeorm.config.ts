import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('PGIS_HOST'),
    port: configService.get('PGIS_PORT'),
    username: configService.get('PGIS_USERNAME'),
    password: configService.get('PGIS_PASSWORD'),
    database: configService.get('PGIS_NAME'),
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    autoLoadEntities: true,
    keepConnectionAlive: true,
    synchronize: false, //configService.get('NODE_ENV') === 'development', // false in production and use migrations
    logging: true, // false in production
  }),
  inject: [ConfigService],
};
