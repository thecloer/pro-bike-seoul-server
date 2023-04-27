import { Module } from '@nestjs/common';
import { SeoulBikeApiService } from './seoul-bike-api.service';
import { HttpModule } from '@nestjs/axios';
import { KakaoMobilityApiService } from './kakao-mobility-api.service';
import { GraphhopperService } from './graphHopper-api.service';
// import { ValhallaService } from './valhalla-api.service';

@Module({
  imports: [HttpModule],
  providers: [
    SeoulBikeApiService,
    KakaoMobilityApiService,
    GraphhopperService,
    // ValhallaService,
  ],
  exports: [
    SeoulBikeApiService,
    KakaoMobilityApiService,
    GraphhopperService,
    // ValhallaService,
  ],
})
export class ExternalApiModule {}
