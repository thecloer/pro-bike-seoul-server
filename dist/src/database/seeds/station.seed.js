"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const station_entity_1 = require("../../stations/entities/station.entity");
const bikeStations_data_1 = require("../seedData/bikeStations.data");
class StationSeeder {
    async run(dataSource, factoryManager) {
        const indexes = [
            { startIdx: 1, endIdx: 1000 },
            { startIdx: 1001, endIdx: 2000 },
            { startIdx: 2001, endIdx: 3000 },
        ];
        const stations = await Promise.all(indexes.map(({ startIdx, endIdx }) => fetch(`http://openapi.seoul.go.kr:8088/${process.env.SEOUL_BIKE_API_KEY}/json/bikeList/${startIdx}/${endIdx}`)
            .then((res) => res.json())
            .then((res) => res.rentBikeStatus.row))).then((res) => res.flat());
        const repository = dataSource.getRepository(station_entity_1.StationEntity);
        await repository.insert(stations.map((station, idx) => {
            var _a, _b;
            const savedStation = bikeStations_data_1.bikeStations.find(({ id }) => id === station.stationId);
            return {
                apiIndx: idx + 1,
                stationId: station.stationId,
                address: (_a = savedStation === null || savedStation === void 0 ? void 0 : savedStation.address) !== null && _a !== void 0 ? _a : '',
                addressName: (_b = savedStation === null || savedStation === void 0 ? void 0 : savedStation.address_name) !== null && _b !== void 0 ? _b : '',
                point: () => `ST_SetSRID(ST_MakePoint(${station.stationLongitude}, ${station.stationLatitude}), 4326)`,
            };
        }));
    }
}
exports.default = StationSeeder;
//# sourceMappingURL=station.seed.js.map