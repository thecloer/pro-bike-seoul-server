import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { GetStationsByCenterDto } from './dto/getStationsByCenter-query.dto';
import { StationsService } from './stations.service';

@Controller('stations')
@UseInterceptors(SuccessInterceptor)
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get('nearby')
  getStationsByCenter(
    @Query()
    stationsByCenterDto: GetStationsByCenterDto,
  ) {
    const { radius, ...centerCoords } = stationsByCenterDto;
    return this.stationsService.getStationsWithStatusByCenter(
      centerCoords,
      radius,
    );
  }
}
