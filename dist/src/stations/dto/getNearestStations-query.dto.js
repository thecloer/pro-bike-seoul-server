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
exports.GetNearestStationsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const coordinates_dto_1 = require("../../common/dto/coordinates.dto");
class GetNearestStationsDto extends coordinates_dto_1.CoordinatesDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: '갯수 정수입니다.' }),
    (0, class_validator_1.IsPositive)({ message: '갯수 양수입니다.' }),
    (0, class_validator_1.Max)(100, { message: '최대 갯수는 100개입니다..' }),
    __metadata("design:type", Number)
], GetNearestStationsDto.prototype, "count", void 0);
exports.GetNearestStationsDto = GetNearestStationsDto;
//# sourceMappingURL=getNearestStations-query.dto.js.map