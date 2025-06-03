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
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_service_1 = require("./logger.service");
const httpException_1 = __importDefault(require("../exceptions/httpException"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.logger = logger_service_1.LoggerService.getInstance('EmployeeService');
    }
    createEmployee(email, name, age, address, password, role, department, status, experience, joiningdate, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.address = address;
            newEmployee.password = yield bcrypt_1.default.hash(password, 10);
            newEmployee.role = role;
            newEmployee.department = department;
            newEmployee.status = status;
            newEmployee.Experience = experience;
            newEmployee.joiningdate = joiningdate;
            newEmployee.employeeId = employeeId;
            return this.employeeRepository.create(newEmployee);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findMany();
        });
    }
    getEmployeeByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = this.employeeRepository.findOneByID(id);
            this.logger.info(employee);
            if (!employee) {
                this.logger.error("employee not found");
                throw new Error("Employee Not Found");
            }
            return employee;
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findOneByEmail(email);
        });
    }
    updateEmployee(id, name, email, age, address, password, role, department, status, joiningdate, experience, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = this.employeeRepository.findOneByID(id);
            if (existingEmployee) {
                const employee = new employee_entity_1.default();
                employee.name = name;
                employee.email = email;
                employee.age = age;
                employee.address = address;
                if (password.length > 0) {
                    employee.password = yield bcrypt_1.default.hash(password, 10);
                }
                employee.role = role;
                employee.department = department;
                employee.status = status;
                employee.joiningdate = joiningdate;
                employee.Experience = experience;
                employee.employeeId = employeeId;
                yield this.employeeRepository.update(id, employee);
            }
            else {
                this.logger.error("employee not exist");
            }
        });
    }
    deleteEmployeeByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findOneByID(id);
            if (!employee) {
                this.logger.error("employee not found");
                throw new httpException_1.default(404, "employee not found");
            }
            yield this.employeeRepository.deleteOneByID(id);
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map