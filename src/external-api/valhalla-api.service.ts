import type { ValhallaAPIResponse } from './types/valhalla-api.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ValhallaService {
  private readonly URL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {
    this.URL = this.configService.get('VALHALLA_API_URL');
  }

  getRoute(locations: { lat: number; lon: number }[]) {
    const url = new URL('/route', this.URL);
    url.searchParams.append(
      'json',
      JSON.stringify({
        locations: locations.map(({ lat, lon }) => ({
          lat,
          lon,
          test: 'test',
        })),
        costing: 'bicycle',
        // https://valhalla.github.io/valhalla/api/turn-by-turn/api-reference/#bicycle-costing-options
        costing_options: {
          bicycle: {
            bicycle_type: 'Hybrid', //'Road' | 'Hybrid' | 'Cross' | 'Mountain' - default: 'Hybrid'
            use_roads: 0.5, // 0(avoid roads, stay on cycleways) ~ 1(more comfortable riding on roads) - default: 0.5
            use_hills: 0.5, // 0(avoid hills) ~ 1(use hills) - default: 0.5
            use_ferry: 0.5, // 0(avoid ferries) ~ 1(favor ferries) - default: 0.5
            use_living_streets: 0.5, // 0(avoid living streets) ~ 1(no effect on route selection) - default: 0.5
            use_bad_surface: 0.5, // 0(no penalization of roads with different surface types) ~ 1(no bad surface) - default: 0.25
            maneuver_penalty: 5, // penalty for changing maneuver type - default: 5 seconds
          },
        },
        directions_options: {
          units: 'kilometers', // 'miles' | 'kilometers' - default: 'miles'
          language: 'ko-KR', // TODO:not supported yet - default: 'en-US'
          directions_type: 'instructions', // 'none' | 'maneuvers' | 'instructions'
        },
      }),
    );

    return this.http.axiosRef
      .get<ValhallaAPIResponse>(url.toString(), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => res.data);
  }
}
