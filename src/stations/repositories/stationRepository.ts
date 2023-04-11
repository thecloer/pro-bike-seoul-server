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
   * @deprecated use findNearest instead
   */
  findWithinDistance(
    coordinates: CoordinatesDto,
    distance: number,
  ): Promise<StationEntity[]>;

  /**
   * find K-nearest stations from a point
   * @param coordinates lng, lat
   * @param count number of stations to find
   * @returns Promise<StationEntity[]>
   */
  findNearest(
    coordinates: CoordinatesDto,
    count: number,
  ): Promise<StationEntity[]>;
}

type StationRepositoryCustomMethods = Pick<
  StationRepository,
  'findWithinDistance' | 'findNearest'
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
      .orderBy(
        `ST_Distance(
			      point::geography,
			      ST_SetSRID(ST_MakePoint( :lng , :lat ), 4326)::geography
			      )`,
      )
      .getMany();
  },

  //https://www.crunchydata.com/blog/a-deep-dive-into-postgis-nearest-neighbor-search
  findNearest(coordinates, count) {
    return (this as StationRepository)
      .createQueryBuilder('station')
      .select()
      .addSelect(
        `"station"."point" <-> ST_SetSRID(ST_MakePoint( :lng , :lat ), 4326)::geography`,
        'dist',
      )
      .setParameters({
        lng: coordinates.lng,
        lat: coordinates.lat,
      })
      .orderBy('dist')
      .limit(count)
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
