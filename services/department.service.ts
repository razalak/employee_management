import DepartmentRepository from "../repositories/department.repositories";
import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repositories";
import { LoggerService } from "./logger.service";
import { departmentService } from "../routes/department.routes";

class DepartmentServices{
    private logger=LoggerService.getInstance('DepartmentServices');
    constructor(private departmentRepository:DepartmentRepository, private employeeRepostory:EmployeeRepository){}

     async createDepartment(name:string):Promise<Department>{
        const newDepartment=new Department();
        newDepartment.dpt_name=name;
        return this.departmentRepository.create(newDepartment);
    }

     async getAllDepartment():Promise<Department[]>{
        return this.departmentRepository.findMany();
     }

     async getDepartmentByID(id:number):Promise<Department>{
        let department=this.departmentRepository.findOneByID(id);
        this.logger.info(department);
        if(!department){
          throw new Error("Department Not Found");
        }
        return department;
      }

       async updateDepartment(id:number,name:string):Promise<void>{
        const existingDepartment=await this.departmentRepository.findOneByID(id);
        this.logger.info(existingDepartment);
        if(existingDepartment){
            const department=new Department();
            department.dpt_name=name;
            await this.departmentRepository.update(id,department);
        }else{
         throw new Error();
        }
        }

         async deleteDepartmentByID(id:number):Promise<void>{
             await this.departmentRepository.deleteOneByID(id);
          }
}

export default DepartmentServices;