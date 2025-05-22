"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = exports.employeeService = exports.employeeRepository = void 0;
const express_1 = require("express");
const employee_repositories_1 = __importDefault(require("../repositories/employee.repositories"));
const data_source_1 = __importDefault(require("../db/data-source"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const employee_controller_1 = __importDefault(require("../controller/employee.controller"));
const employee_service_1 = __importDefault(require("../services/employee.service"));
const employeeRouter = (0, express_1.Router)();
exports.employeeRepository = new employee_repositories_1.default(data_source_1.default.getRepository(employee_entity_1.default));
exports.employeeService = new employee_service_1.default(exports.employeeRepository);
exports.employeeController = new employee_controller_1.default(exports.employeeService, employeeRouter);
exports.default = employeeRouter;
//# sourceMappingURL=employee.routes.js.map