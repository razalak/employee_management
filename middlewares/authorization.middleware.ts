import {NextFunction,Request,Response} from "express";
import {EmployeeRole} from "../entities/employee.entity";
import HttpException from "../exceptions/httpException";

export const authorizationMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const role=req.user?.role;
    if(role!==EmployeeRole.HR){
        throw new HttpException(402,"User has no privilage to access the resource");
    }
    next();
}