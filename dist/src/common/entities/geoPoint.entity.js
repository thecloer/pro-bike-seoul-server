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
exports.GeoPointEntity = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
class GeoPointEntity {
    get lng() {
        return this.point.coordinates[0];
    }
    get lat() {
        return this.point.coordinates[1];
    }
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)('geometry'),
    __metadata("design:type", Object)
], GeoPointEntity.prototype, "point", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], GeoPointEntity.prototype, "lng", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], GeoPointEntity.prototype, "lat", null);
exports.GeoPointEntity = GeoPointEntity;
//# sourceMappingURL=geoPoint.entity.js.map