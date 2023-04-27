type GraphopperApiResponseSuccess = {
  paths: [
    {
      distance: number;
      time: number;
      transfers: number;
      points_encoded: boolean;
      bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
      points: {
        type: 'LineString';
        coordinates: [number, number][]; // [lon, lat] or [lon, lat, ele]
      };
      instructions: {
        distance: number;
        heading: number;
        sign: number;
        interval: number[];
        text: string;
        time: number;
        street_name: string;
      }[];

      ascend: number;
      descend: number;
      snapped_waypoints: {
        type: 'LineString';
        coordinates: [number, number][];
      };
    },
  ];
};

type GraphopperApiResponseFail = {
  message: string;
};

export type GraphopperApiResponse =
  | GraphopperApiResponseSuccess
  | GraphopperApiResponseFail;
