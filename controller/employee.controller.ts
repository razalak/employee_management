import {Request,Response,NextFunction} from "express";
import EmployeeService from "../services/employee.service";
import {Router} from "express";
import HttpException from "../exceptions/httpException";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import Address from "../entities/address.entity";
import Department from "../entities/department.entity";
import { EmployeeRole } from "../entities/employee.entity";
import checkRoles from "../middlewares/authorization.middleware";



class EmployeeController{
    constructor(private employeeService:EmployeeService,router:Router){
        router.get("/",this.getAllEmployee.bind(this));
        router.get("/:id",this.getEmployeeByID.bind(this));
        router.post("/",checkRoles(EmployeeRole.DEVELOPER),this.createEmployee.bind(this));
        router.put("/:id",checkRoles(EmployeeRole.DEVELOPER),this.updateEmployee.bind(this));
        router.delete("/:id",checkRoles(EmployeeRole.DEVELOPER),this.deleteEmployeeByID);
    }

    async  createEmployee(req:Request,res:Response,next:NextFunction){
       try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }


      const address=new Address();
      address.houseno=createEmployeeDto.address.houseno;
      address.line_1=createEmployeeDto.address.line_1;
      address.line_2=createEmployeeDto.address.line_2;

      const department=new Department();
      department.id=createEmployeeDto.department.id;

      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        address,
        createEmployeeDto.password,
        createEmployeeDto.role,
        department,
        createEmployeeDto.status,
        createEmployeeDto.Experience,
        createEmployeeDto.joiningdate,
        createEmployeeDto.employeeId
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
    }

    async getAllEmployee(req:Request,res:Response){
        const employees=await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    async getEmployeeByID(req:Request,res:Response,next:NextFunction){
        try{
            const id=Number(req.params.id);
            const employee=await this.employeeService.getEmployeeByID(id);
            if(!employee){
            throw new HttpException(404,'employee not found');
            }
            res.status(200).send(employee);
        }catch(error){
            console.log(error);
            next(error);
        }
    }
     updateEmployee=async (req:Request,res:Response,next:NextFunction)=>{
      try{
        console.log("details of employee",req.body);
        const id=req.params.id;
        const name=req.body.name;
        const email=req.body.email;
        const age=req.body.age;
        const address=req.body.address;
        const password=req.body.password;
        const role=req.body.role;
        const department=req.body.department;
        const status=req.body.status;
        const joiningdate=req.body.joiningdate;
        const Experience=req.body.Experience;
        const employeeId=req.body.employeeId;
        await this.employeeService.updateEmployee(id,name,email,age,address,password,role,department,status,joiningdate,Experience,employeeId);
        res.status(200).send();
      }catch(error){
        console.error(error);
        next();
      }
    }

     deleteEmployeeByID=async (req:Request,res:Response,next:NextFunction)=>{
      try{
        const id=req.params.id;
        await this.employeeService.deleteEmployeeByID(id);
        res.status(200).send();
      }catch(error){
          next(error);
        }
    }
}

export default EmployeeController;