import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { StationEntity } from 'src/stations/entities/station.entity';
import { bikeStations } from '../seedData/bikeStations.data';

export default class StationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(StationEntity);
    await repository.insert(
      bikeStations.map((stationRaw) => ({
        stationId: stationRaw.id,
        address: stationRaw.address,
        addressName: stationRaw.address_name,
        point: () =>
          `ST_SetSRID(ST_MakePoint(${stationRaw.lng}, ${stationRaw.lat}), 4326)`,
      })),
    );
  }
}
