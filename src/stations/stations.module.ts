import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { StationEntity } from './entities/station.entity';
import { StationsRepositoryProvider } from './repositories/stationRepository';
import { ExternalApiModule } from 'src/external-api/external-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity]), ExternalApiModule],
  controllers: [StationsController],
  providers: [StationsRepositoryProvider, StationsService],
  exports: [StationsService],
})
export class StationsModule {}
