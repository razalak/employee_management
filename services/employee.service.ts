import EmployeeRepository from "../repositories/employee.repositories";
import Employee from "../entities/employee.entity";

class EmployeeService{
    constructor(private employeeRepository:EmployeeRepository){}

    async createEmployee(email:string,name:string):Promise<Employee>{
        const newEmployee=new Employee;
        newEmployee.name=name;
        newEmployee.email=email;
        return this.employeeRepository.create(newEmployee);
    }



   async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findMany();
   }

   async getEmployeeByID(id:number):Promise<Employee>{
        return this.employeeRepository.findOneByID(id);
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
    await this.employeeRepository.deleteOneByID(id);
   }
}