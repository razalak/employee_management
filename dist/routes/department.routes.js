"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentController = exports.departmentService = exports.departmentRepository = void 0;
const express_1 = require("express");
const department_repositories_1 = __importDefault(require("../repositories/department.repositories"));
const data_source_1 = __importDefault(require("../db/data-source"));
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const department_controller_1 = __importDefault(require("../controller/department.controller"));
const department_service_1 = __importDefault(require("../services/department.service"));
const employee_routes_1 = require("./employee.routes");
const departmentRouter = (0, express_1.Router)();
exports.departmentRepository = new department_repositories_1.default(data_source_1.default.getRepository(department_entity_1.default));
exports.departmentService = new department_service_1.default(exports.departmentRepository, employee_routes_1.employeeRepository);
exports.departmentController = new department_controller_1.default(exports.departmentService, departmentRouter);
exports.default = departmentRouter;
//# sourceMappingURL=department.routes.js.map