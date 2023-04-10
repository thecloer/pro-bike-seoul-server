import type { StationWithStatus } from './types/stations.type';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoordinatesDto } from 'src/common/dto/coordinates.dto';
import { StationEntity } from './entities/station.entity';
import { StationRepository } from './repositories/stationRepository';
import { SeoulBikeApiService } from 'src/external-api/seoul-bike-api.service';
import { isFullFilled, makeSeoulBikeApiIndexes } from 'src/lib/helpers';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepository: StationRepository,
    private readonly seoulBikeApiService: SeoulBikeApiService,
  ) {}

  async getStationsWithStatusByCenter(
    centerCoordinates: CoordinatesDto,
    radius: number,
  ) {
    try {
      const stationsNearby = await this.stationRepository.findWithinDistance(
        centerCoordinates,
        radius,
      );

      const seoulBikeApiRequestIndexes = makeSeoulBikeApiIndexes(
        stationsNearby.map(({ apiIndx }) => apiIndx),
      );
      const statusPromises = seoulBikeApiRequestIndexes.map(
        ({ startIdx, endIdx }) =>
          this.seoulBikeApiService.getStatus(startIdx, endIdx),
      );
      const settledStatus = await Promise.allSettled(statusPromises);
      const status = settledStatus
        .filter(isFullFilled)
        .flatMap(({ value }) => value);

      const stationsWithStatus: StationWithStatus[] = stationsNearby.map(
        (station) => {
          const { stationName, rackTotCnt, parkingBikeTotCnt } = status.find(
            ({ stationId }) => stationId === station.stationId,
          );
          return {
            lat: station.lat,
            lng: station.lng,
            stationId: station.stationId,
            address: station.address,
            addressName: station.addressName,
            stationName,
            rackCount: Number(rackTotCnt),
            availableBikeCount: Number(parkingBikeTotCnt),
          };
        },
      );

      return stationsWithStatus;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
