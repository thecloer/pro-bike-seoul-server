import {
  Body,
  Controller,
  HttpException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { GetDirectionsDto } from './dto/getDirections-body.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { valhallaDataFormatter } from 'src/lib/helpers';

@Controller('routes')
@UseInterceptors(SuccessInterceptor)
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('directions')
  async getDirections(@Body() { origin, destination }: GetDirectionsDto) {
    const res = await this.routesService.makeDirections(origin, destination);
    if ('error' in res) throw new HttpException(res.error, res.status_code);

    return valhallaDataFormatter(res.trip);
  }
}
