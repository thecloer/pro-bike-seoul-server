import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsModule } from './stations/stations.module';
import { typeOrmModuleOptions } from './config/typeorm.config';
import { DEFAULT_PORT } from './config/defaultValues';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(DEFAULT_PORT),
        PGIS_USERNAME: Joi.string().required(),
        PGIS_PASSWORD: Joi.string().required(),
        PGIS_HOST: Joi.string().required(),
        PGIS_PORT: Joi.number().required(),
        PGIS_NAME: Joi.string().required(),

        SEOUL_BIKE_API_KEY: Joi.string().required(),
        VALHALLA_API_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    StationsModule,
    RoutesModule,
  ],
})
export class AppModule {}
