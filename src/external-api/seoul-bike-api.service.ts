import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SEOUL_BIKE_API_RESULTS,
  SeoulBikeApiResponse,
  SeoulBikeApiResponseSuccess,
} from './types/seoul-bike-api.type';
import { catchError, lastValueFrom, map } from 'rxjs';

const isSuccess = (
  response: SeoulBikeApiResponse['rentBikeStatus'],
): response is SeoulBikeApiResponseSuccess =>
  SEOUL_BIKE_API_RESULTS.SUCCESS.some(
    ({ CODE }) => CODE === response.RESULT.CODE,
  );

@Injectable()
export class SeoulBikeApiService {
  private readonly makeUrl = (startIdx: number, endIdx: number) =>
    `http://openapi.seoul.go.kr:8088/${this.configService.get(
      'SEOUL_BIKE_API_KEY',
    )}/json/bikeList/${startIdx}/${endIdx}`;

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService,
  ) {}

  getStatus(startIdx: number, endIdx: number) {
    return lastValueFrom(
      this.http
        .get<SeoulBikeApiResponse>(this.makeUrl(startIdx, endIdx))
        .pipe(
          map((res) => {
            const response = res.data.rentBikeStatus;
            if (isSuccess(response)) return response.row;
            throw new HttpException(
              response.RESULT.MESSAGE,
              HttpStatus.EXPECTATION_FAILED,
            );
          }),
        )
        .pipe(
          catchError(() => {
            throw new HttpException(
              'Seoul Bike API Error',
              HttpStatus.BAD_REQUEST,
            );
          }),
        ),
    );
  }
}
