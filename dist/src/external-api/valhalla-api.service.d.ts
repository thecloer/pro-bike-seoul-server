import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class ValhallaService {
    private readonly configService;
    private readonly http;
    private readonly URL;
    constructor(configService: ConfigService, http: HttpService);
    getRoute(locations: {
        lat: number;
        lon: number;
    }[]): Promise<{
        trip: import("./types/valhalla-api.type").ValhallaRouteTrip;
    } | {
        error_code: number;
        error: string;
        status_code: number;
        status: string;
    }>;
}
