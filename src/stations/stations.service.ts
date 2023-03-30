import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';
import { StationEntity } from './entities/station.entity';
import { StationRepository } from './repositories/stationRepository';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepository: StationRepository,
  ) {}

  async getAllStations() {
    return await this.stationRepository.find();
  }

  searchStationsByCenter(centerCoordinates: CoordinatesDto, radius: number) {
    try {
      return this.stationRepository.findWithinDistance(
        centerCoordinates,
        radius,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
