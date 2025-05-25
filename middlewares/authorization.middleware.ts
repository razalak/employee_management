import {NextFunction,Request,Response} from "express";
import {EmployeeRole} from "../entities/employee.entity";
import HttpException from "../exceptions/httpException";

const checkRoles=((role:EmployeeRole)=>{
        return (req:Request,res:Response,next:NextFunction)=>{
    const Role=req.user?.role;
    console.log("Role-",Role);
    console.log("role-",role)
    if(Role!==role){
        throw new HttpException(402,"User has no privilage to access the resource");
    }
    next();
}
});

export default checkRoles;