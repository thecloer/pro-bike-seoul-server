import { GeoPointEntity } from 'src/common/entities/geoPoint.entity';
export declare class StationEntity extends GeoPointEntity {
    stationId: string;
    address: string;
    addressName: string;
    apiIndx: number;
}
