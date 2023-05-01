import type { Position } from './types/routes.type';
import { StationsService } from 'src/stations/stations.service';
import { ValhallaService } from 'src/external-api/valhalla-api.service';
export declare class RoutesService {
    private readonly stationsService;
    private readonly valhallaService;
    constructor(stationsService: StationsService, valhallaService: ValhallaService);
    makeDirections(origin: Position, destination: Position): Promise<{
        trip: import("../external-api/types/valhalla-api.type").ValhallaRouteTrip;
    } | {
        error_code: number;
        error: string;
        status_code: number;
        status: string;
    }>;
}
