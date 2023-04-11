import type { StationWithStatus } from './types/stations.type';
import type { SeoulBikeInfo } from 'src/external-api/types/seoul-bike-api.type';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';
import { StationEntity } from './entities/station.entity';
import { StationRepository } from './repositories/stationRepository';
import { SeoulBikeApiService } from 'src/external-api/seoul-bike-api.service';
import { isFullFilled, makeSeoulBikeApiIndexes } from 'src/lib/helpers';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepository: StationRepository,
    private readonly seoulBikeApiService: SeoulBikeApiService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getStationsWithStatus(
    centerCoordinates: CoordinatesDto,
    count: number,
  ) {
    try {
      const stationsNearby = await this.stationRepository.findNearest(
        centerCoordinates,
        count,
      );

      const apiIndexes = stationsNearby.map(({ apiIndx }) => apiIndx);
      // read from cache
      const cachedStatusOrUndefined = await this.cacheManager.store.mget(
        ...apiIndexes.map(String),
      );
      const uncachedApiIndexes = apiIndexes.filter(
        (_, i) => !cachedStatusOrUndefined[i],
      );
      const cachedStatus = cachedStatusOrUndefined.filter(
        (s) => s,
      ) as SeoulBikeInfo[];
      const seoulBikeApiRequestIndexes =
        makeSeoulBikeApiIndexes(uncachedApiIndexes);
      const newStatusPromises = seoulBikeApiRequestIndexes.map(
        ({ startIdx, endIdx }) =>
          this.seoulBikeApiService
            .getStatus(startIdx, endIdx)
            .then((results) => {
              const newCacheEntries: [string, SeoulBikeInfo][] = Array.from(
                { length: endIdx - startIdx + 1 },
                (_, i) => [String(startIdx + i), results[i]],
              );
              // write to cache
              this.cacheManager.store.mset(newCacheEntries);
              return results;
            }),
      );
      const settledNewStatus = await Promise.allSettled(newStatusPromises);
      const newStatus = settledNewStatus
        .filter(isFullFilled)
        .flatMap(({ value }) => value);

      const status = [...cachedStatus, ...newStatus];

      const stationsWithStatus: StationWithStatus[] = stationsNearby.map(
        ({ stationId, lat, lng, address, addressName }) => {
          const { stationName, rackTotCnt, parkingBikeTotCnt } = status.find(
            (status) => status.stationId === stationId,
          ) ?? { stationName: '', rackTotCnt: 0, parkingBikeTotCnt: 0 };

          return {
            lat,
            lng,
            stationId,
            address,
            addressName,
            stationName,
            rackCount: Number(rackTotCnt),
            availableBikeCount: Number(parkingBikeTotCnt),
          };
        },
      );

      return stationsWithStatus;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error in getStationsWithStatus');
    }
  }
}
