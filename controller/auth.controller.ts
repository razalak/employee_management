import authService from "../services/auth.service";
import{Request,NextFunction,Response,Router} from "express";

class AuthController{
    constructor(private authservice:authService,router:Router){
        router.post("/login",this.login.bind(this));
    }
    async login(req:Request,res:Response,next:NextFunction){
        try{
        const {email,password}=req.body;
        const data=await this.authservice.login(email,password);
        res.status(200).send(data);
        }catch(error){
            console.log(error);
            next(error);
        }
    }
}

export default AuthController;