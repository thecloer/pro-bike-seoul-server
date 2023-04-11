import type {
  KakaoMobilityWaypointsResponse,
  Position,
} from 'src/routes/types/routes.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lngLatToXY } from 'src/lib/helpers';

@Injectable()
export class KakaoMobilityApiService {
  private readonly URL = 'https://apis-navi.kakaomobility.com';
  private readonly headers = {
    Authorization: `KakaoAK ${this.configService.get('KAKAO_REST_API_KEY')}`,
    'Content-Type': 'application/json',
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  async getDirection(
    origin: Position,
    destination: Position,
    waypoints: Position[],
  ) {
    const body = {
      origin: lngLatToXY(origin),
      waypoints: waypoints.map(lngLatToXY),
      destination: lngLatToXY(destination),
      avoid: ['roadevent', 'toll', 'ferries', 'motorway', 'uturn'],
      car_type: 7,
    };
    const res = await this.http.axiosRef.post<KakaoMobilityWaypointsResponse>(
      `${this.URL}/v1/waypoints/directions`,
      body,
      { headers: this.headers },
    );

    return res.data.routes;
  }
}
