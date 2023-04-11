import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';

export class GetDirectionsDto {
  @ValidateNested()
  @Type(() => CoordinatesDto)
  origin: CoordinatesDto;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  destination: CoordinatesDto;
}
