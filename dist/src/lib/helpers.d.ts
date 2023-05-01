import { ValhallaRouteTrip } from 'src/external-api/types/valhalla-api.type';
import { Route } from 'src/routes/types/routes.type';
export declare const makeSeoulBikeApiIndexes: (indexes: number[]) => {
    startIdx: number;
    endIdx: number;
}[];
export declare const isFullFilled: <T>(result: PromiseSettledResult<T>) => result is PromiseFulfilledResult<T>;
export declare const valhallaDataFormatter: (trip: ValhallaRouteTrip) => Route;
