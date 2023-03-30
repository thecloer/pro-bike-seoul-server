import { Provider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';
import { DataSource, Repository } from 'typeorm';
import { StationEntity } from '../entities/station.entity';

export interface StationRepository extends Repository<StationEntity> {
  this: Repository<StationEntity>;

  findNearPoint(
    coordinates: CoordinatesDto,
    maxDistance: number,
  ): Promise<StationEntity[]>;
}

type StationRepositoryCustomMethods = Pick<StationRepository, any>;

const stationRepositoryCustomMethods: StationRepositoryCustomMethods = {
  findNearPoint(coordinates: CoordinatesDto, maxDistance: number) {
    // TODO:
    // return (this as StationRepository)
    //   .createQueryBuilder('station')
    //   .select()
    //   .where(
    //     'ST_Distance_Sphere(point, ST_MakePoint( :lng , :lat )) <= :maxDistance',
    //     { lng: coordinates.lng, lat: coordinates.lat, maxDistance },
    //   )
    //   .getMany();
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
