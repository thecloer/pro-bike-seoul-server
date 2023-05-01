"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationsRepositoryProvider = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const station_entity_1 = require("../entities/station.entity");
const stationRepositoryCustomMethods = {
    findWithinDistance(coordinates, distance) {
        return this
            .createQueryBuilder('station')
            .select()
            .where(`ST_DWithin(
            point::geography,
            ST_SetSRID(ST_MakePoint( :lng , :lat ), 4326)::geography,
            :distance)`, {
            lng: coordinates.lng,
            lat: coordinates.lat,
            distance,
        })
            .orderBy(`ST_Distance(
			      point::geography,
			      ST_SetSRID(ST_MakePoint( :lng , :lat ), 4326)::geography
			      )`)
            .getMany();
    },
    findNearest(coordinates, count) {
        return this
            .createQueryBuilder('station')
            .select()
            .addSelect(`"station"."point" <-> ST_SetSRID(ST_MakePoint( :lng , :lat ), 4326)::geography`, 'dist')
            .setParameters({
            lng: coordinates.lng,
            lat: coordinates.lat,
        })
            .orderBy('dist')
            .limit(count)
            .getMany();
    },
};
exports.StationsRepositoryProvider = {
    provide: (0, typeorm_1.getRepositoryToken)(station_entity_1.StationEntity),
    useFactory: (DataSource) => {
        return DataSource.getRepository(station_entity_1.StationEntity).extend(stationRepositoryCustomMethods);
    },
    inject: [(0, typeorm_1.getDataSourceToken)()],
};
//# sourceMappingURL=stationRepository.js.map