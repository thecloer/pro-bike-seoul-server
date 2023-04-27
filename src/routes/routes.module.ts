import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { StationsModule } from 'src/stations/stations.module';
import { ExternalApiModule } from 'src/external-api/external-api.module';

@Module({
  imports: [StationsModule, ExternalApiModule],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
