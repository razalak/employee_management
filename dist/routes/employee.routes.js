"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_repositories_1 = __importDefault(require("../repositories/employee.repositories"));
const data_source_1 = __importDefault(require("../db/data-source"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const employee_controller_1 = __importDefault(require("../controller/employee.controller"));
const employee_service_1 = __importDefault(require("../services/employee.service"));
const employeeRouter = (0, express_1.Router)();
const employeeRepository = new employee_repositories_1.default(data_source_1.default.getRepository(employee_entity_1.default));
const employeeService = new employee_service_1.default(employeeRepository);
const employeeController = new employee_controller_1.default(employeeService, employeeRouter);
exports.default = employeeRouter;
//# sourceMappingURL=employee.routes.js.map