import {Request,Response,NextFunction} from "express";
import HttpException from "../exceptions/httpException";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/constants";
import { JwtPayload } from "../dto/jwt-payload";

const getToken=(req:Request)=>{
    const token:string=req.headers.authorization;

    console.log(token)
    if(!token){
        throw new HttpException(401,'Not Authorized');
    }
    const tokenSplit = token.split(' ')
    console.log(tokenSplit);
    if(tokenSplit.length!=2){
        throw new HttpException(401,"Not a valid token");
    }
    console.log("token split -- ", tokenSplit)
    return tokenSplit[1];
}

const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const token=getToken(req);
    if(!token){
        throw new HttpException(401,"Not Authorized");
    }
    try{
        const payload=jwt.verify(token,JWT_SECRET) as JwtPayload;
        req.user=payload;
        console.log("user-"+ JSON.stringify(req.user));
    }catch{
        throw new HttpException(401,"Invalid or Expired token");
    }
    next();
}

export default authMiddleware;