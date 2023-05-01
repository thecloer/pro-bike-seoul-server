import { Provider } from '@nestjs/common';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';
import { Repository } from 'typeorm';
import { StationEntity } from '../entities/station.entity';
export interface StationRepository extends Repository<StationEntity> {
    this: Repository<StationEntity>;
    findWithinDistance(coordinates: CoordinatesDto, distance: number): Promise<StationEntity[]>;
    findNearest(coordinates: CoordinatesDto, count: number): Promise<StationEntity[]>;
}
export declare const StationsRepositoryProvider: Provider;
