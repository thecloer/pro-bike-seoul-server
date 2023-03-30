import { Provider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';
import { DataSource, Repository } from 'typeorm';
import { StationEntity } from '../entities/station.entity';

export interface StationRepository extends Repository<StationEntity> {
  this: Repository<StationEntity>;

  findWithinDistance(
    coordinates: CoordinatesDto,
    maxDistance: number,
  ): Promise<StationEntity[]>;
}

type StationRepositoryCustomMethods = Pick<StationRepository, any>;

const stationRepositoryCustomMethods: StationRepositoryCustomMethods = {
  findWithinDistance(coordinates: CoordinatesDto, distance: number) {
    return (this as StationRepository)
      .createQueryBuilder('station')
      .select()
      .where(
        `ST_DWithin(
	          point::geography,
	          ST_SetSRID(ST_MakePoint( :lng , :lat ), 4326)::geography,
            :distance)`,
        {
          lng: coordinates.lng,
          lat: coordinates.lat,
          distance,
        },
      )
      .getMany();
  },
};

export const StationsRepositoryProvider: Provider = {
  provide: getRepositoryToken(StationEntity),
  useFactory: (DataSource: DataSource) => {
    return DataSource.getRepository(StationEntity).extend(
      stationRepositoryCustomMethods,
    );
  },
  inject: [getDataSourceToken()],
};
