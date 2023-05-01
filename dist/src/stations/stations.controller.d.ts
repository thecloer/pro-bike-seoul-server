import { GetStationsWithStatus } from './dto/getStationsWithStatus-query.dto';
import { StationsService } from './stations.service';
export declare class StationsController {
    private readonly stationsService;
    constructor(stationsService: StationsService);
    getStationsByCenter(stationsByCenterDto: GetStationsWithStatus): Promise<import("./types/stations.type").StationWithStatus[]>;
}
