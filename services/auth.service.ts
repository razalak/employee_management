import { JWT_VALIDITY,JWT_SECRET } from "../utils/constants";
import { JwtPayload } from "../dto/jwt-payload";
import HttpException from "../exceptions/httpException";
import EmployeeService from "./employee.service";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

class authService{
    constructor(private employeeService:EmployeeService){}

    async login(email:string,password:string){
        const employee=await this.employeeService.getEmployeeByEmail(email);
        if(!employee){
            throw new HttpException(404,"no such user");
        }
        const isPasswordValid=await bcrypt.compare(
            password,
            employee.password
        )
        if(!isPasswordValid){
            throw new HttpException(400,"invalid password");
        }
        const payload:JwtPayload={
            id:employee.id,
            email:employee.email,
            role:employee.role
        }
        const token=jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_VALIDITY});
        return {
    tokenType:"Bearer",
    accessToken:token
            }
    }
}

export default authService;