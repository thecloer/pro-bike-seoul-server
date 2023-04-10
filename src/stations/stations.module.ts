import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { StationEntity } from './entities/station.entity';
import { StationsRepositoryProvider } from './repositories/stationRepository';
import { ExternalApiModule } from 'src/external-api/external-api.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StationEntity]),
    CacheModule.register({
      ttl: 2 * 60 * 1000, // 2 minutes
    }),
    ExternalApiModule,
  ],
  controllers: [StationsController],
  providers: [StationsRepositoryProvider, StationsService],
  exports: [StationsService],
})
export class StationsModule {}
