import { Type } from 'class-transformer';
import { IsNumber, IsPositive, Max } from 'class-validator';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';

export class GetStationsByCenterDto extends CoordinatesDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive({ message: '반경은 양수입니다.' })
  @Max(5000, { message: '반경은 5000 이하입니다.' })
  readonly radius: number;
}
