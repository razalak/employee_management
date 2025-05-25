import express, { Request, Response } from "express";
import employeeRouter from "./routes/employee.routes";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { processTimeMiddleware } from "./middlewares/processTimeMiddleware";
import {Client,ClientConfig} from 'pg';
import datasource from "./db/data-source"
import errorMiddleware from "./middlewares/errorHandlingMiddleware";
import authRouter from "./routes/auth.routes";
import authMiddleware from "./middlewares/auth.Middleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routes/department.routes";

const server = express();
const logger=LoggerService.getInstance('app()');

server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);
server.use("/auth",authRouter);

server.use("/employees",authMiddleware,employeeRouter);
server.use("/department",departmentRouter);
server.use(errorMiddleware);

server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

(async()=>{
  try{
    await datasource.initialize();
    logger.info('connected');
  }catch{
    logger.error('failed to connect to db');
    process.exit(1);
  }
  server.listen(3000, () => {
  logger.info("server listening to 3000");
});
})();


