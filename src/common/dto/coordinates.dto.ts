import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class CoordinatesDto {
  @Type(() => Number)
  @IsNumber()
  @Min(126.734086, { message: '서울 외 지역입니다. (경도는 126.734086 이상)' })
  @Max(127.269311, { message: '서울 외 지역입니다. (경도는 127.269311 이하)' })
  readonly lng: number;

  @Type(() => Number)
  @IsNumber()
  @Min(37.413294, { message: '서울 외 지역입니다. (위도는 37.413294 이상)' })
  @Max(37.715133, { message: '서울 외 지역입니다. (위도는 37.715133 이하)' })
  readonly lat: number;
}
