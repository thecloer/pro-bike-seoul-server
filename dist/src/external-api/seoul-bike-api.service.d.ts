import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class SeoulBikeApiService {
    private readonly configService;
    private readonly http;
    private readonly makeUrl;
    constructor(configService: ConfigService, http: HttpService);
    getStatus(startIdx: number, endIdx: number): Promise<import("./types/seoul-bike-api.type").SeoulBikeInfo[]>;
}
