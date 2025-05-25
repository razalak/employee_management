import{Router} from "express";
import authService from "../services/auth.service";
import AuthController from "../controller/auth.controller";
import { employeeService } from "./employee.routes";
import EmployeeRepository from "../repositories/employee.repositories";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeController from "../controller/employee.controller";

const authRouter=new Router();

export const AuthService=new authService(employeeService);
export const authController=new AuthController(AuthService,authRouter);

export default authRouter;
