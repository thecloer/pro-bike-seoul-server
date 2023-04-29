export type Position = {
  lat: number;
  lng: number;
};

export type Route = {
  points: Position[];
  time: number;
  distance: number;
  shapes: {
    encodedPolyline: string;
    bounds: {
      leftBottom: Position;
      rightTop: Position;
    };
  }[];
  maneuvers: {
    time: number;
    distance: number;
    shapeIndex: {
      legNumber: number; // which shape in shapes
      begin: number; // begin in the shape
      end: number; // end in the shape
    };
    instructions: {
      instruction: string;
      postTransition?: string;
      preTransition?: string;
      transitionAlert?: string;
    };
  }[];
};
