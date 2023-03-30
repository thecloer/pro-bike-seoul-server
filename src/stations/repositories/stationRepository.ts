import { Provider } from '@nestjs/common';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';
import { DataSource, Repository } from 'typeorm';
import { StationEntity } from '../entities/station.entity';

export interface StationRepository extends Repository<StationEntity> {
  this: Repository<StationEntity>;

  /**
   * find stations within a distance from a point
   * @param coordinates lng, lat
   * @param distance meters
   * @returns Promise<StationEntity[]>
   */
  findWithinDistance(
    coordinates: CoordinatesDto,
    distance: number,
  ): Promise<StationEntity[]>;
}

type StationRepositoryCustomMethods = Pick<
  StationRepository,
  'findWithinDistance'
>;
const stationRepositoryCustomMethods: StationRepositoryCustomMethods = {
  // http://postgis.net/workshops/postgis-intro/geography.html
  // https://postgis.net/docs/manual-3.3/ST_DWithin.html
  findWithinDistance(coordinates, distance) {
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
