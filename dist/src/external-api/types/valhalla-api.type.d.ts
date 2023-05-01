type ValhallaRouteSummary = {
    time: number;
    length: number;
    has_toll: boolean;
    has_highway: boolean;
    has_ferry: boolean;
    has_time_restrictions: boolean;
    min_lat: number;
    min_lon: number;
    max_lat: number;
    max_lon: number;
    cost: number;
};
type ValhallaRouteLocation = {
    lat: number;
    lon: number;
    type?: 'break' | 'through' | 'via' | 'break_through';
    side_of_street?: string;
    original_index?: number;
};
type ValhallaRouteManeuver = {
    type: number;
    instruction: string;
    verbal_transition_alert_instruction?: string;
    verbal_pre_transition_instruction: string;
    verbal_post_transition_instruction?: string;
    verbal_succinct_transition_instruction?: string;
    street_names?: string[];
    time: number;
    begin_street_names?: string[];
    length: number;
    cost: number;
    begin_shape_index: number;
    end_shape_index: number;
    verbal_multi_cue?: boolean;
    travel_mode: 'drive' | 'pedestrian' | 'bicycle' | 'transit';
    travel_type: 'car' | 'foot' | 'road' | 'hybrid';
};
type ValhallaRouteLeg = {
    maneuvers: ValhallaRouteManeuver[];
    summary: ValhallaRouteSummary;
    shape: string;
};
export type ValhallaRouteTrip = {
    status: number;
    status_message: string;
    units: 'miles' | 'kilometers';
    language: string;
    warnings?: any[];
    locations: ValhallaRouteLocation[];
    legs: ValhallaRouteLeg[];
    summary: ValhallaRouteSummary;
};
type ValhallaAPIResponseSuccess = {
    trip: ValhallaRouteTrip;
};
type ValhallaAPIResponseFail = {
    error_code: number;
    error: string;
    status_code: number;
    status: string;
};
export type ValhallaAPIResponse = ValhallaAPIResponseSuccess | ValhallaAPIResponseFail;
export {};
