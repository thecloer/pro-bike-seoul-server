import type { StationWithStatus } from './types/stations.type';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';
import { StationEntity } from './entities/station.entity';
import { StationRepository } from './repositories/stationRepository';
import { SeoulBikeApiService } from 'src/external-api/seoul-bike-api.service';
import { Cache } from 'cache-manager';
export declare class StationsService {
    private readonly stationRepository;
    private readonly seoulBikeApiService;
    private cacheManager;
    constructor(stationRepository: StationRepository, seoulBikeApiService: SeoulBikeApiService, cacheManager: Cache);
    getStationsWithStatus(centerCoordinates: CoordinatesDto, count: number): Promise<StationWithStatus[]>;
    getNearestStations(coordinates: CoordinatesDto, count: number): Promise<StationEntity[]>;
}
