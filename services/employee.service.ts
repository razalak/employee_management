import EmployeeRepository from "../repositories/employee.repositories";
import Employee, { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import Address from "../entities/address.entity";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";
import Department from "../entities/department.entity";
import HttpException from "../exceptions/httpException";

class EmployeeService{
     private logger=LoggerService.getInstance('EmployeeService');
    constructor(private employeeRepository:EmployeeRepository){}

    async createEmployee(email:string,name:string,age:number,address:Address,password:string,role:EmployeeRole,department:Department,status:EmployeeStatus,experience:number,joiningdate:Date):Promise<Employee>{
        const newEmployee=new Employee();
        newEmployee.name=name;
        newEmployee.email=email;
        newEmployee.age=age;
        newEmployee.address=address;
        newEmployee.password=await bcrypt.hash(password,10);
        newEmployee.role=role;
        newEmployee.department=department;
        newEmployee.status=status;
        newEmployee.Experience=experience;
        newEmployee.joiningdate=joiningdate;
        return this.employeeRepository.create(newEmployee);
    }



   async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findMany();
   }

   async getEmployeeByID(id:number):Promise<Employee>{
        let employee=this.employeeRepository.findOneByID(id);
        this.logger.info(employee);
        if(!employee){
          throw new Error("Employee Not Found");
        }
        return employee;
   }

     async getEmployeeByEmail(email:string):Promise<Employee>{
        return this.employeeRepository.findOneByEmail(email);
   }

   async updateEmployee(id:number,name:string,email:string,age:number,address:Address,password:string,role:EmployeeRole,department:Department,status:EmployeeStatus,joiningdate:Date,experience:number):Promise<void>{
        const existingEmployee=this.employeeRepository.findOneByID(id);
        if(existingEmployee){
            const employee=new Employee();
            employee.name=name;
            employee.email=email;
            employee.age=age;
            employee.address=address;
            employee.password=password;
            employee.role=role;
            employee.department=department;
            employee.status=status;
            employee.joiningdate=joiningdate;
            employee.Experience=experience;
            await this.employeeRepository.update(id,employee);
        }
   }

   async deleteEmployeeByID(id:number):Promise<void>{
      const employee=await this.employeeRepository.findOneByID(id);
      if(!employee){
          throw new HttpException(404,"employee not found");
      }
     await this.employeeRepository.deleteOneByID(id);
   }

}

export default EmployeeService;