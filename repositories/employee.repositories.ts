import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import Address from "../entities/address.entity";
import HttpException from "../exceptions/httpException";
class EmployeeRepository{
    constructor(private repository:Repository<Employee>){}

    async create(employee:Employee):Promise <Employee>{
        return this.repository.save(employee);
    }
    async findMany():Promise <Employee[]>{
        return this.repository.find({
            relations:{
                address:true,
                department:true
            }
        });
    }
    async findOneByID(id:number):Promise <Employee|null>{
        return this.repository.findOne({
            where:{id},
            relations:{
                address:true,
                department:true
            }
        });
    }

    async findOneByEmail(email:string):Promise <Employee|null>{
        return this.repository.findOne({
            where:{email},
            relations:{
                address:true,
                department:true
            }
        });
    }
    async update(id:number,employee:Employee):Promise <void>{
        await this.repository.save({id,...employee});
    }
    async deleteOneByID(id:number):Promise<void>{
        const employee=await this.findOneByID(id);
        if(!employee) throw new HttpException(404,"employee not found");
        await this.repository.softRemove(employee);
    }

};

export default EmployeeRepository;