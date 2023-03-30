import { GeoPointEntity } from 'src/common/entities/geoPoint.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bike_station')
export class StationEntity extends GeoPointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  stationId: string;

  @Column()
  address: string;

  @Column()
  addressName: string;
}
