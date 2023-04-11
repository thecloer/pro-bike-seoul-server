import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { GetStationsWithStatus } from './dto/getStationsWithStatus-query.dto';
import { StationsService } from './stations.service';

@Controller('stations')
@UseInterceptors(SuccessInterceptor)
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get('nearby')
  getStationsByCenter(
    @Query()
    stationsByCenterDto: GetStationsWithStatus,
  ) {
    const { count, ...centerCoords } = stationsByCenterDto;
    return this.stationsService.getStationsWithStatus(centerCoords, count);
  }
}
