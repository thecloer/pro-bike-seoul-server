import { Module } from '@nestjs/common';
import { SeoulBikeApiService } from './seoul-bike-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SeoulBikeApiService],
  exports: [SeoulBikeApiService],
})
export class ExternalApiModule {}
