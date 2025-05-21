import express, { Request, Response } from "express";
import employeeRouter from "./routes/employee.routes";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { processTimeMiddleware } from "./middlewares/processTimeMiddleware";
import {Client,ClientConfig} from 'pg';
import datasource from "./db/data-source"
import errorMiddleware from "./middlewares/errorHandlingMiddleware";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.use("/employees", employeeRouter);
server.use(errorMiddleware);

server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

(async()=>{
  try{
    await datasource.initialize();
    console.log('connected');
  }catch{
    console.error('failed to connect to db');
    process.exit(1);
  }
  server.listen(3000, () => {
  console.log("server listening to 3000");
});
})();


