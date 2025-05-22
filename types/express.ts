import { JwtPayload } from "../dto/jwt-payload";

declare global{
    namespace Exprss{
        interface Request{
            user?:JwtPayload;
        }
    }
}