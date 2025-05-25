import {Router} from 'express';
import DepartmentRepository from '../repositories/department.repositories';
import datasource from '../db/data-source';
import Department from '../entities/department.entity';
import DepartmentController from '../controller/department.controller';
import DepartmentServices from '../services/department.service';
import { employeeRepository } from './employee.routes';

const departmentRouter=Router();

export const departmentRepository=new DepartmentRepository(datasource.getRepository(Department));
export const departmentService=new DepartmentServices(departmentRepository,employeeRepository);
export const departmentController=new DepartmentController(departmentService,departmentRouter);

export default departmentRouter;