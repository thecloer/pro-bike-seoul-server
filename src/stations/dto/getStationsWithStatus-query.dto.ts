import { Type } from 'class-transformer';
import { IsInt, IsPositive, Max } from 'class-validator';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';

export class GetStationsWithStatus extends CoordinatesDto {
  @Type(() => Number)
  @IsInt({ message: '갯수 정수입니다.' })
  @IsPositive({ message: '갯수 양수입니다.' })
  @Max(100, { message: '최대 갯수는 100개입니다..' })
  readonly count: number;
}
