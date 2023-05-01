"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationEntity = void 0;
const class_transformer_1 = require("class-transformer");
const geoPoint_entity_1 = require("../../common/entities/geoPoint.entity");
const typeorm_1 = require("typeorm");
let StationEntity = class StationEntity extends geoPoint_entity_1.GeoPointEntity {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true, primary: true }),
    __metadata("design:type", String)
], StationEntity.prototype, "stationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StationEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StationEntity.prototype, "addressName", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], StationEntity.prototype, "apiIndx", void 0);
StationEntity = __decorate([
    (0, typeorm_1.Entity)('bike_station')
], StationEntity);
exports.StationEntity = StationEntity;
//# sourceMappingURL=station.entity.js.map