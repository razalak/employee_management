"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthService = void 0;
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const employee_routes_1 = require("./employee.routes");
const authRouter = new express_1.Router();
exports.AuthService = new auth_service_1.default(employee_routes_1.employeeService);
exports.authController = new auth_controller_1.default(exports.AuthService, authRouter);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map