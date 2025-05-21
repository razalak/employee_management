import {Request,Response,NextFunction} from "express";
import EmployeeService from "../services/employee.service";
import {Router} from "express";
import HttpException from "../exceptions/httpException";
import { isEmail } from "../validators/emailValidator";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { createAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";

class EmployeeController{
    constructor(private employeeService:EmployeeService,router:Router){
        router.get("/",this.getAllEmployee.bind(this));
        router.get("/:id",this.getEmployeeByID.bind(this));
        router.post("/",this.createEmployee.bind(this));
        router.put("/:id",this.updateEmployee.bind(this));
        router.delete("/:id",this.deleteEmployeeByID);
    }

    async  createEmployee(req:Request,res:Response,next:NextFunction){
       try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
    //   createEmployeeDto.address.line1, createEM
   
    //     const address = createAddressDto.line1
      const address=new Address();
      address.line1=createEmployeeDto.address.line1;
      address.pincode=createEmployeeDto.address.pincode;

      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        address
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
     updateEmployee=async (req:Request,res:Response)=>{
        const id=req.params.id;
        const name=req.params.name;
        const email=req.params.email;
        await this.employeeService.updateEmployee(id,name,email);
        res.status(200).send();
    }

     deleteEmployeeByID=async (req:Request,res:Response)=>{
        const id=req.params.id;
        await this.employeeService.deleteEmployeeByID(id);
        res.status(200).send();
    }
}

export default EmployeeController;