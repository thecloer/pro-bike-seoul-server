import { Point } from 'typeorm';
export declare abstract class GeoPointEntity {
    point: Point;
    get lng(): number;
    get lat(): number;
}
