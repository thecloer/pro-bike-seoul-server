import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SeoulBikeApiService } from './seoul-bike-api.service';
import { ValhallaService } from './valhalla-api.service';

@Module({
  imports: [HttpModule],
  providers: [SeoulBikeApiService, ValhallaService],
  exports: [SeoulBikeApiService, ValhallaService],
})
export class ExternalApiModule {}
