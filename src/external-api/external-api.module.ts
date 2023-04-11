import { Module } from '@nestjs/common';
import { SeoulBikeApiService } from './seoul-bike-api.service';
import { HttpModule } from '@nestjs/axios';
import { KakaoMobilityApiService } from './kakao-mobility-api.service';

@Module({
  imports: [HttpModule],
  providers: [SeoulBikeApiService, KakaoMobilityApiService],
  exports: [SeoulBikeApiService, KakaoMobilityApiService],
})
export class ExternalApiModule {}
