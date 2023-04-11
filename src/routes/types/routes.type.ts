export type Position = {
  lat: number;
  lng: number;
};

export type KakaoMobilityWaypointsResponse = {
  trans_id: string;
  routes: {
    result_code: number;
    result_msg: string;
    summary: {
      origin: {
        name: string;
        x: number;
        y: number;
      };
      destination: {
        name: string;
        x: number;
        y: number;
      };
      waypoints: {
        name: string;
        x: number;
        y: number;
      }[];
      distance: number;
      duration: number;
    };
    sections: {
      distance: number; // meters
      duration: number; // seconds
      bound: {
        min_x: number; // left bottom
        min_y: number;
        max_x: number; // right top
        max_y: number;
      };
      roads: {
        name: string;
        distance: number;
        duration: number;
        vertexes: number[]; // [x1, y1, x2, y2, ...]
      }[];
    }[];
  }[];
};
