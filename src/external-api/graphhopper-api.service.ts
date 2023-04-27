import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Position } from 'src/routes/types/routes.type';
import { GraphopperApiResponse } from './types/graphhopper-api.type';

@Injectable()
export class GraphhopperService {
  private readonly URL: URL;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {
    this.URL = new URL('https://graphhopper.com/api/1/route');
    this.URL.searchParams.append(
      'key',
      configService.get('GRAPHHOPPER_API_KEY'),
    );
  }

  getRoute(points: Position[]) {
    const body = {
      points: points.map(({ lat, lng }) => [lng, lat]),
      profile: 'bike',
      snap_preventions: ['motorway', 'trunk', 'ferry', 'tunnel', 'ford'],
      details: ['time', 'distance'],
      locale: 'ko',
      instructions: true,
      calc_points: true,
      points_encoded: false,
    };
    return this.http.axiosRef
      .post<GraphopperApiResponse>(this.URL.toString(), body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);
  }
}
