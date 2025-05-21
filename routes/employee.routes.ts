import {Router} from 'express';
import EmployeeRepository from '../repositories/employee.repositories';
import datasource from '../db/data-source';
import Employee from '../entities/employee.entity';
import EmployeeController from '../controller/employee.controller';
import EmployeeService from '../services/employee.service';

const employeeRouter=Router();

const employeeRepository=new EmployeeRepository(datasource.getRepository(Employee));
const employeeService=new EmployeeService(employeeRepository);
const employeeController=new EmployeeController(employeeService,employeeRouter);

export default employeeRouter;