import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { StationEntity } from 'src/stations/entities/station.entity';
import { bikeStations } from '../seedData/bikeStations.data';
import { SeoulBikeInfo } from 'src/external-api/types/seoul-bike-api.type';

export default class StationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const indexes = [
      { startIdx: 1, endIdx: 1000 },
      { startIdx: 1001, endIdx: 2000 },
      { startIdx: 2001, endIdx: 3000 },
    ];
    const stations = await Promise.all(
      indexes.map(
        ({ startIdx, endIdx }) =>
          fetch(
            `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_BIKE_API_KEY}/json/bikeList/${startIdx}/${endIdx}`,
          )
            .then((res) => res.json())
            .then((res) => res.rentBikeStatus.row) as Promise<SeoulBikeInfo[]>,
      ),
    ).then((res) => res.flat());

    const repository = dataSource.getRepository(StationEntity);
    await repository.insert(
      stations.map((station, idx) => {
        const savedStation = bikeStations.find(
          ({ id }) => id === station.stationId,
        );
        return {
          apiIndx: idx + 1,
          stationId: station.stationId,
          address: savedStation?.address ?? '',
          addressName: savedStation?.address_name ?? '',
          point: () =>
            `ST_SetSRID(ST_MakePoint(${station.stationLongitude}, ${station.stationLatitude}), 4326)`,
        };
      }),
    );
  }
}
