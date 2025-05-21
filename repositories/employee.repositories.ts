import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import Address from "../entities/address.entity";
class EmployeeRepository{
    constructor(private repository:Repository<Employee>){}

    async create(employee:Employee):Promise <Employee>{
        return this.repository.save(employee);
    }
    async findMany():Promise <Employee[]>{
        return this.repository.find({
            relations:{
                address:true
            }
        });
    }
    async findOneByID(id:number):Promise <Employee|null>{
        return this.repository.findOne({
            where:{id},
            relations:{
                address:true
            }
        });
    }
    async update(id:number,employee:Employee):Promise <void>{
        await this.repository.save({id,...employee});
    }
    async deleteOneByID(id:number):Promise<void>{
        await this.repository.delete({id});
    }

     async remove(empid:number):Promise<void>{
        const employee=await this.findOneByID(empid);
        if(employee){
        await this.repository.delete(employee);
        }
    }
};

export default EmployeeRepository;