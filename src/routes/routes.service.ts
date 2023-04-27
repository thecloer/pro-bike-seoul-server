import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { StationEntity } from 'src/stations/entities/station.entity';
import { StationsService } from 'src/stations/stations.service';
import { StationWithStatus } from 'src/stations/types/stations.type';
import { Position } from './types/routes.type';
import { GraphhopperService } from 'src/external-api/graphHopper-api.service';
// import { ValhallaService } from 'src/external-api/valhalla-api.service';

@Injectable()
export class RoutesService {
  constructor(
    private readonly stationsService: StationsService,
    private readonly graphhopperService: GraphhopperService, // private readonly valhallaService: ValhallaService,
  ) {}

  async makeDirections(origin: Position, destination: Position) {
    try {
      const stationPromises = await Promise.allSettled([
        this.stationsService.getStationsWithStatus(origin, 20),
        this.stationsService.getNearestStations(destination, 1),
      ]);

      const [stationsNearOrigin, [destinationStation]] = stationPromises.map(
        (promise) => {
          if (promise.status === 'fulfilled') return promise.value;
          throw new InternalServerErrorException(promise.reason);
        },
      ) as [StationWithStatus[], StationEntity[]];
      const originStation = stationsNearOrigin.find(
        ({ availableBikeCount }) => availableBikeCount > 0,
      );

      if (!originStation)
        throw new HttpException('No available bikes', HttpStatus.NOT_FOUND);
      if (!destinationStation)
        throw new HttpException('No destination station', HttpStatus.NOT_FOUND);

      const waypoints = [originStation, destinationStation].map((station) => ({
        lat: station.lat,
        lng: station.lng,
      }));

      // return await this.valhallaService.getRoute([
      //   origin,
      //   ...waypoints,
      //   destination,
      // ]);

      return await this.graphhopperService.getRoute(waypoints);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error in makeDirections');
    }
  }
}
