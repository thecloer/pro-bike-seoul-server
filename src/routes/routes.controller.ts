import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { GetDirectionsDto } from './dto/getDirections-body.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { PathData } from './types/routes.type';

@Controller('routes')
@UseInterceptors(SuccessInterceptor)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('directions')
  async getDirections(
    @Body() { origin, destination }: GetDirectionsDto,
  ): Promise<PathData> {
    const res = await this.routesService.makeDirections(origin, destination);
    if ('message' in res) throw new BadRequestException(res.message);

    const result: PathData[] = res.paths.map(
      ({ bbox, distance, time, points, snapped_waypoints }) => ({
        bbox,
        distance,
        time,
        points: points.coordinates.map(([lng, lat]) => ({ lat, lng })),
        waypoints: snapped_waypoints.coordinates.map(([lng, lat]) => ({
          lat,
          lng,
        })),
      }),
    );
    return result[0];
  }
}
