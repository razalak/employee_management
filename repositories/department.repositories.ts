import { Repository } from "typeorm";
import Department from "../entities/department.entity";
import { employeeRepository } from "../routes/employee.routes";

class DepartmentRepository{
    constructor(private repository:Repository<Department>){}

    async create(department:Department):Promise <Department>{
        return this.repository.save(department);
    }

    async findMany():Promise <Department[]>{
        return this.repository.find();
    }

    async findOneByID(id:number):Promise <Department|null>{
          return this.repository.findOne({
            where:{id},
            relations:{
               employees:true
            }
        });
    }

    async update(id:number,department:Department):Promise <void>{
        await this.repository.update(id,{...department});
    }

    async deleteOneByID(id:number):Promise<void>{
        await this.repository.delete({id});
    }

}

export default DepartmentRepository;