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
        time: number;
        distance: number;
        shapeIndex: {
            legNumber: number;
            begin: number;
            end: number;
        };
        instructions: {
            instruction: string;
            postTransition?: string;
            preTransition?: string;
            transitionAlert?: string;
        };
    }[];
};
