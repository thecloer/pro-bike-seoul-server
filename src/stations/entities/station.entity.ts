import { Exclude } from 'class-transformer';
import { GeoPointEntity } from 'src/common/entities/geoPoint.entity';
import { Column, Entity } from 'typeorm';

@Entity('bike_station')
export class StationEntity extends GeoPointEntity {
  @Column({ unique: true, primary: true })
  stationId: string;

  @Column()
  address: string;

  @Column()
  addressName: string;

  @Exclude()
  @Column({ unique: true })
  apiIndx: number;
}
