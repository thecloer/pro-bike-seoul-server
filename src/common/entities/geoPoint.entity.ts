import { Exclude, Expose } from 'class-transformer';
import { Column, Point } from 'typeorm';

export abstract class GeoPointEntity {
  @Exclude()
  @Column('geometry')
  point: Point;

  @Expose()
  get lng() {
    return this.point.coordinates[0];
  }
  @Expose()
  get lat() {
    return this.point.coordinates[1];
  }
}
