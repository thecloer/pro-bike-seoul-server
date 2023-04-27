// https://valhalla.github.io/valhalla/api/turn-by-turn/api-reference/#outputs-of-a-route

/**
 * Valhalla Route API Summary Object
 * @property {number} time - Estimated elapsed time to complete the trip.
 * @property {number} length - Distance traveled for the entire trip. Units are either miles or kilometers based on the input units specified.
 * @property {boolean} has_toll - Flag indicating if the the path uses one or more toll segments.
 * @property {boolean} has_highway - Flag indicating if the the path uses one or more highway segments.
 * @property {boolean} has_ferry - Flag indicating if the the path uses one or more ferry segments.
 * @property {boolean} has_time_restrictions - Flag indicating if the the path uses one or more time restricted segments.
 * @property {number} min_lat - Minimum latitude of the bounding box of the route.
 * @property {number} min_lon - Minimum longitude of the bounding box of the route.
 * @property {number} max_lat - Maximum latitude of the bounding box of the route.
 * @property {number} max_lon - Maximum longitude of the bounding box of the route.
 */
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
  type: string;
  lat: number;
  lon: number;
  side_of_street?: string;
  original_index: number;
};

enum ValhallaRouteManeuverTypeEnum {
  kNone,
  kStart,
  kStartRight,
  kStartLeft,
  kDestination,
  kDestinationRight,
  kDestinationLeft,
  kBecomes,
  kContinue,
  kSlightRight,
  kRight,
  kSharpRight,
  kUturnRight,
  kUturnLeft,
  kSharpLeft,
  kLeft,
  kSlightLeft,
  kRampStraight,
  kRampRight,
  kRampLeft,
  kExitRight,
  kExitLeft,
  kStayStraight,
  kStayRight,
  kStayLeft,
  kMerge,
  kRoundaboutEnter,
  kRoundaboutExit,
  kFerryEnter,
  kFerryExit,
  kTransit,
  kTransitTransfer,
  kTransitRemainOn,
  kTransitConnectionStart,
  kTransitConnectionTransfer,
  kTransitConnectionDestination,
  kPostTransitConnectionDestination,
  kMergeRight,
  kMergeLeft,
}

/**
 * Valhalla Route API Maneuver Object
 * @property {ValhallaRouteManeuverTypeEnum} type - The type of maneuver. See the table below for possible values.
 * @property {string} instruction - Written maneuver instruction. Describes the maneuver, such as "Turn right onto Main Street".
 * @property {string} verbal_transition_alert_instruction - Text suitable for use as a verbal alert in a navigation application. The transition alert instruction will prepare the user for the forthcoming transition. For example: "Turn right onto North Prince Street".
 * @property {string} verbal_pre_transition_instruction - Text suitable for use as a verbal message immediately prior to the maneuver transition. For example "Turn right onto North Prince Street, U.S. 2 22".
 * @property {string} verbal_post_transition_instruction - Text suitable for use as a verbal message immediately after the maneuver transition. For example "Continue on U.S. 2 22 for 3.9 miles".
 * @property {string} verbal_succinct_transition_instruction - Text suitable for use as a verbal message immediately prior to the maneuver transition. For example "Turn right".
 * @property {string[]} street_names - List of street names that are consistent along the entire nonobvious maneuver.
 * @property {number} time - Estimated time along the maneuver in seconds.
 */
type ValhallaRouteManeuver = {
  type: ValhallaRouteManeuverTypeEnum;
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
  travel_type: 'car' | 'foot' | 'road' | 'hybrid'; // road is for bicycle
};
type ValhallaRouteLeg = {
  maneuvers: ValhallaRouteManeuver[];
  summary: ValhallaRouteSummary;
  shape: string; // encoded polyline(https://developers.google.com/maps/documentation/utilities/polylinealgorithm?hl=ko)
};
type ValhallaRouteTrip = {
  status: number;
  status_message: string;
  units: 'miles' | 'kilometers';
  language: string;
  warnings?: any[];
  locations: ValhallaRouteLocation[];
  legs: ValhallaRouteLeg[];
  summary: ValhallaRouteSummary;
};
export type ValhallaAPIResponse = {
  success: boolean;
  data: { trip: ValhallaRouteTrip };
};

// https://valhalla.github.io/valhalla/api/turn-by-turn/api-reference/#bicycle-costing-options
type ValhallaRouteRequestBicycleOptions = {
  bicycle_type?: 'Road' | 'Hybrid' | 'Cross' | 'Mountain';
  use_roads?: number; // 0(avoid roads, stay on cycleways) ~ 1(more comfortable riding on roads) - default: 0.5
  use_hills?: number; // 0(avoid hills) ~ 1(use hills) - default: 0.5
  use_ferry?: number; // 0(avoid ferries) ~ 1(favor ferries) - default: 0.5
  use_living_streets?: number; // 0(avoid living streets) ~ 1(no effect on route selection) - default: 0.5
  use_bad_surface?: number; // 0(no penalization of roads with different surface types) ~ 1(no bad surface) - default: 0.25

  maneuver_penalty?: number; // default: 5 seconds
};
