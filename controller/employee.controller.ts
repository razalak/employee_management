import {Request,Response} from "express";
import EmployeeService from "../services/employee.service";
import {Router} from "express";

class EmployeeController{
    constructor(private employeeService:EmployeeService,router:Router){
        router.get("/",this.getAllEmployee.bind(this));
        router.get("/:id",this.getEmployeeByID.bind(this));
        router.post("/:id",this.createEmployee.bind(this));
        router.put("/:id",this.updateEmployee.bind(this));
        router.delete("/:id",this.deleteEmployeeByID);
    }

    async  createEmployee(req:Request,res:Response){
        const email=req.body.email;
        const name=req.body.name;
        const savedEmployee=await this.employeeService.createEmployee(email,name);
        res.status(201).send(savedEmployee);
    }

    async getAllEmployee(req:Request,res:Response){
        const employees=await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    async getEmployeeByID(req:Request,res:Response){
        const id=req.params.id;
        const employee=await this.employeeService.getEmployeeByID(id);
        res.status(200).send(employee);
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