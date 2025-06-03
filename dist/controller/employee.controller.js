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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_employee_dto_1 = require("../dto/create-employee.dto");
const address_entity_1 = __importDefault(require("../entities/address.entity"));
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const employee_entity_1 = require("../entities/employee.entity");
const authorization_middleware_1 = __importDefault(require("../middlewares/authorization.middleware"));
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("details of employee", req.body);
                const id = req.params.id;
                const name = req.body.name;
                const email = req.body.email;
                const age = req.body.age;
                const address = req.body.address;
                const password = req.body.password;
                const role = req.body.role;
                const department = req.body.department;
                const status = req.body.status;
                const joiningdate = req.body.joiningdate;
                const experience = req.body.experience;
                const employeeId = req.body.employeeId;
                yield this.employeeService.updateEmployee(id, name, email, age, address, password, role, department, status, joiningdate, experience, employeeId);
                res.status(200).send();
            }
            catch (error) {
                console.error(error);
                next();
            }
        });
        this.deleteEmployeeByID = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.employeeService.deleteEmployeeByID(id);
                res.status(200).send();
            }
            catch (error) {
                next(error);
            }
        });
        router.get("/", this.getAllEmployee.bind(this));
        router.get("/:id", this.getEmployeeByID.bind(this));
        router.post("/", (0, authorization_middleware_1.default)(employee_entity_1.EmployeeRole.DEVELOPER), this.createEmployee.bind(this));
        router.put("/:id", (0, authorization_middleware_1.default)(employee_entity_1.EmployeeRole.DEVELOPER), this.updateEmployee.bind(this));
        router.delete("/:id", (0, authorization_middleware_1.default)(employee_entity_1.EmployeeRole.DEVELOPER), this.deleteEmployeeByID);
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const address = new address_entity_1.default();
                address.houseno = createEmployeeDto.address.houseno;
                address.line_1 = createEmployeeDto.address.line_1;
                address.line_2 = createEmployeeDto.address.line_2;
                const department = new department_entity_1.default();
                department.id = createEmployeeDto.department.id;
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, address, createEmployeeDto.password, createEmployeeDto.role, department, createEmployeeDto.status, createEmployeeDto.experience, createEmployeeDto.joiningdate, createEmployeeDto.employeeId);
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
    }
    getEmployeeByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const employee = yield this.employeeService.getEmployeeByID(id);
                if (!employee) {
                    throw new httpException_1.default(404, 'employee not found');
                }
                res.status(200).send(employee);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map