"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class DepartmentRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(department) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(department);
        });
    }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    findOneByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id },
                relations: {
                    employees: true
                }
            });
        });
    }
    update(id, department) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(id, Object.assign({}, department));
        });
    }
    deleteOneByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({ id });
        });
    }
}
exports.default = DepartmentRepository;
//# sourceMappingURL=department.repositories.js.map