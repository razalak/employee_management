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
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.updateEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const name = req.params.name;
            const email = req.params.email;
            yield this.employeeService.updateEmployee(id, name, email);
            res.status(200).send();
        });
        this.deleteEmployeeByID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield this.employeeService.deleteEmployeeByID(id);
            res.status(200).send();
        });
        router.get("/", this.getAllEmployee.bind(this));
        router.get("/:id", this.getEmployeeByID.bind(this));
        router.post("/", this.createEmployee.bind(this));
        router.put("/:id", this.updateEmployee.bind(this));
        router.delete("/:id", this.deleteEmployeeByID);
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
                //   createEmployeeDto.address.line1, createEM
                //     const address = createAddressDto.line1
                const address = new address_entity_1.default();
                address.line1 = createEmployeeDto.address.line1;
                address.pincode = createEmployeeDto.address.pincode;
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, address);
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