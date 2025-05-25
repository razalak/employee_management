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
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const logger_service_1 = require("./logger.service");
class DepartmentServices {
    constructor(departmentRepository, employeeRepostory) {
        this.departmentRepository = departmentRepository;
        this.employeeRepostory = employeeRepostory;
        this.logger = logger_service_1.LoggerService.getInstance('DepartmentServices');
    }
    createDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.dpt_name = name;
            return this.departmentRepository.create(newDepartment);
        });
    }
    getAllDepartment() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findMany();
        });
    }
    getDepartmentByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let department = this.departmentRepository.findOneByID(id);
            this.logger.info(department);
            if (!department) {
                throw new Error("Department Not Found");
            }
            return department;
        });
    }
    updateDepartment(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findOneByID(id);
            this.logger.info(existingDepartment);
            if (existingDepartment) {
                const department = new department_entity_1.default();
                department.dpt_name = name;
                yield this.departmentRepository.update(id, department);
            }
            else {
                throw new Error();
            }
        });
    }
    deleteDepartmentByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.departmentRepository.deleteOneByID(id);
        });
    }
}
exports.default = DepartmentServices;
//# sourceMappingURL=department.service.js.map