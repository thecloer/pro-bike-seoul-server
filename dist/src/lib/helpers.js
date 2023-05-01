"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valhallaDataFormatter = exports.isFullFilled = exports.makeSeoulBikeApiIndexes = void 0;
const SEOUL_BIKE_API_MAX_GAP = 1000;
const makeSeoulBikeApiIndexes = (indexes) => {
    if (indexes.length < 1)
        return [];
    return indexes
        .sort((a, b) => a - b)
        .reduce((acc, curIdx, i) => {
        if (i === 0)
            return acc;
        const startIdx = acc.at(-1).startIdx;
        const gap = curIdx - startIdx;
        if (gap < SEOUL_BIKE_API_MAX_GAP)
            acc.at(-1).endIdx = curIdx;
        else
            acc.push({ startIdx: curIdx, endIdx: curIdx });
        return acc;
    }, [{ startIdx: indexes[0], endIdx: indexes[0] }]);
};
exports.makeSeoulBikeApiIndexes = makeSeoulBikeApiIndexes;
const isFullFilled = (result) => result.status === 'fulfilled';
exports.isFullFilled = isFullFilled;
const valhallaDataFormatter = (trip) => {
    const points = trip.locations.map(({ lat, lon }) => ({ lat, lng: lon }));
    const time = trip.summary.time;
    const distance = trip.summary.length;
    const bounds = {
        leftBottom: {
            lat: trip.summary.min_lat,
            lng: trip.summary.min_lon,
        },
        rightTop: {
            lat: trip.summary.max_lat,
            lng: trip.summary.max_lon,
        },
    };
    const trips = trip.legs.reduce(({ shapes, maneuvers }, cur, legNumber) => {
        const curShape = {
            encodedPolyline: cur.shape,
            bounds: {
                leftBottom: {
                    lat: cur.summary.min_lat,
                    lng: cur.summary.min_lon,
                },
                rightTop: {
                    lat: cur.summary.max_lat,
                    lng: cur.summary.max_lon,
                },
            },
        };
        const curManeuver = cur.maneuvers.map((m) => ({
            time: m.time,
            distance: m.length,
            shapeIndex: {
                legNumber,
                begin: m.begin_shape_index,
                end: m.end_shape_index,
            },
            instructions: {
                instruction: m.instruction,
                postTransition: m.verbal_post_transition_instruction,
                preTransition: m.verbal_pre_transition_instruction,
                transitionAlert: m.verbal_transition_alert_instruction,
            },
        }));
        return {
            shapes: [...shapes, curShape],
            maneuvers: [...maneuvers, ...curManeuver],
        };
    }, {
        shapes: [],
        maneuvers: [],
    });
    return Object.assign({ summary: {
            points,
            bounds,
            time,
            distance,
        } }, trips);
};
exports.valhallaDataFormatter = valhallaDataFormatter;
//# sourceMappingURL=helpers.js.map