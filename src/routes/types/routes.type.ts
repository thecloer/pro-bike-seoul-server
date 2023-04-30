export type Position = {
  lat: number;
  lng: number;
};

export type Route = {
  summary: {
    points: Position[];
    bounds: {
      leftBottom: Position;
      rightTop: Position;
    };
    time: number;
    distance: number;
  };
  shapes: {
    encodedPolyline: string;
    bounds: {
      leftBottom: Position;
      rightTop: Position;
    };
  }[];
  maneuvers: {
    time: number; // seconds
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
