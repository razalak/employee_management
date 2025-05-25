import {Request,Response,NextFunction,Router} from "express";
import DepartmentServices from "../services/department.service";
import HttpException from "../exceptions/httpException";
import { validate, Validate } from "class-validator";
import {createDepartmentDto } from "../dto/create-department.dto";
import { plainToInstance } from "class-transformer";

export default class DepartmentController{
    constructor(private departmentservice:DepartmentServices,router:Router){
                router.get("/",this.getAllDepartment.bind(this));
                router.get("/:id",this.getDepartmentByID.bind(this));
                router.post("/",this.CreateDepartment.bind(this));
                router.put("/:id",this.updateDepartment.bind(this));
                router.delete("/:id",this.deleteDepartmentByID);
    }

    async CreateDepartment(req:Request,res:Response,next:NextFunction){
        try{
            const CreateDepartmentDto=plainToInstance(createDepartmentDto,req.body);
            const errors=await validate(CreateDepartmentDto);
             if (errors.length > 0) {
         console.log(JSON.stringify(errors));
         throw new HttpException(400, JSON.stringify(errors));
             }
          
             const savedDepartment=await this.departmentservice.createDepartment(CreateDepartmentDto.dpt_name);
             res.status(201).send(savedDepartment);
        }catch(error){
            next(error);
        }
    }

    async getAllDepartment(req:Request,res:Response,next:NextFunction){
        const department=await this.departmentservice.getAllDepartment();
        res.status(200).send(department);
    }

    async getDepartmentByID(req:Request,res:Response,next:NextFunction){
        try{
            const id=Number(req.params.id);
            const department=await this.departmentservice.getDepartmentByID(id);
            if(!department){
                throw new HttpException(404,"Department Not Found");
            }
            res.status(200).send(department);
        }catch(error){
            next(error);
        }
    }

    updateDepartment=async (req:Request,res:Response,next:NextFunction)=>{
      try{
        const id=req.params.id;
        const dpt_name=req.body.dpt_name
        await this.departmentservice.updateDepartment(id,dpt_name);
        res.status(200).send();
      }catch(error){
        console.error(error);
        next();
      }
    }

    deleteDepartmentByID=async (req:Request,res:Response,next:NextFunction)=>{
        try{
        const id=req.params.id;
        await this.departmentservice.deleteDepartmentByID(id);
        res.status(200).send();
        }catch(error){
            next();
        }
    }
}