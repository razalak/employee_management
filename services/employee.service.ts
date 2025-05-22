import EmployeeRepository from "../repositories/employee.repositories";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import Address from "../entities/address.entity";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";

class EmployeeService{
     private logger=LoggerService.getInstance(EmployeeService.name);
    constructor(private employeeRepository:EmployeeRepository){}

    async createEmployee(email:string,name:string,age:number,address:Address,password:string,role:EmployeeRole):Promise<Employee>{
        const newEmployee=new Employee();
        newEmployee.name=name;
        newEmployee.email=email;
        newEmployee.age=age;
        newEmployee.address=address;
        newEmployee.password=await bcrypt.hash(password,10);
        newEmployee.role=role;
        return this.employeeRepository.create(newEmployee);
    }



   async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findMany();
   }

   async getEmployeeByID(id:number):Promise<Employee>{
        let employee=this.employeeRepository.findOneByID(id);
        if(!employee){
          throw new Error("Employee Not Found");
        }
        return employee;
   }

     async getEmployeeByEmail(email:string):Promise<Employee>{
        return this.employeeRepository.findOneByEmail(email);
   }

   async updateEmployee(id:number,name:string,email:string):Promise<void>{
        const existingEmployee=this.employeeRepository.findOneByID(id);
        if(existingEmployee){
            const employee=new Employee();
            employee.name=name;
            employee.email=email;
            await this.employeeRepository.update(id,employee);
        }
   }

   async deleteEmployeeByID(id:number):Promise<void>{
     const employee=await this.employeeRepository.findOneByID(id);
    await this.employeeRepository.deleteOneByID(id);
   }

   async remove(empid:number):Promise<void>{
    await this.employeeRepository.remove(empid);
   }
}

export default EmployeeService;