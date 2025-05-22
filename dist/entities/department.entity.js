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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const abstract_entity_1 = __importDefault(require("./abstract.entity"));
const address_entity_1 = __importDefault(require("./address.entity"));
let Department = class Department extends abstract_entity_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Department.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Department.prototype, "dpt_name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.default, (address) => address.employee, {
        cascade: true,
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.default)
], Department.prototype, "address", void 0);
Department = __decorate([
    (0, typeorm_1.Entity)()
], Department);
exports.default = Department;
//# sourceMappingURL=department.entity.js.map