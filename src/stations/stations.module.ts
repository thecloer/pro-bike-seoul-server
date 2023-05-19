import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { StationEntity } from './entities/station.entity';
import { StationsRepositoryProvider } from './repositories/stationRepository';
import { ExternalApiModule } from 'src/external-api/external-api.module';
import { SETTINGS } from 'src/config/settings';

@Module({
  imports: [
    TypeOrmModule.forFeature([StationEntity]),
    CacheModule.register({
      ttl: SETTINGS.BIKE_STATION_STATUS_CACHE_TTL,
    }),
    ExternalApiModule,
  ],
  controllers: [StationsController],
  providers: [StationsRepositoryProvider, StationsService],
  exports: [StationsService],
})
export class StationsModule {}
