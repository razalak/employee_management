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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("../exceptions/httpException"));
class EmployeeRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.save(employee);
        });
    }
    findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                relations: {
                    address: true,
                    department: true
                }
            });
        });
    }
    findOneByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id },
                relations: {
                    address: true,
                    department: true
                }
            });
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { email },
                relations: {
                    address: true,
                    department: true
                }
            });
        });
    }
    update(id, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.save(Object.assign({ id }, employee));
        });
    }
    deleteOneByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.findOneByID(id);
            if (!employee)
                throw new httpException_1.default(404, "employee not found");
            yield this.repository.softRemove(employee);
        });
    }
}
;
exports.default = EmployeeRepository;
//# sourceMappingURL=employee.repositories.js.map