import {Router} from 'express';
import EmployeeRepository from '../repositories/employee.repositories';
import datasource from '../db/data-source';
import Employee from '../entities/employee.entity';
import EmployeeController from '../controller/employee.controller';
import EmployeeService from '../services/employee.service';

const employeeRouter=Router();

export const employeeRepository=new EmployeeRepository(datasource.getRepository(Employee));
export const employeeService=new EmployeeService(employeeRepository);
export const employeeController=new EmployeeController(employeeService,employeeRouter);

export default employeeRouter;