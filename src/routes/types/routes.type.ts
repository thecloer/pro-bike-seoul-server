export type Position = {
  lat: number;
  lng: number;
};

export type PathData = {
  distance: number;
  time: number;
  bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  points: Position[]; // [lon, lat] or [lon, lat, ele]
  waypoints: Position[];
};
