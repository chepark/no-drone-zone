var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
let Pilot = class Pilot extends BaseEntity {
};
__decorate([
    PrimaryColumn("varchar"),
    __metadata("design:type", String)
], Pilot.prototype, "pilotId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Pilot.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Pilot.prototype, "phoneNumber", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Pilot.prototype, "email", void 0);
__decorate([
    Column({ type: "decimal", precision: 16, scale: 12 }),
    __metadata("design:type", Number)
], Pilot.prototype, "distance", void 0);
__decorate([
    Column({ type: "datetime" }),
    __metadata("design:type", Date)
], Pilot.prototype, "lastSeenAt", void 0);
Pilot = __decorate([
    Entity()
], Pilot);
export { Pilot };
//# sourceMappingURL=Pilot.js.map