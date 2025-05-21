import express, { Request, Response } from "express";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import { processTimeMiddleware } from "./processTimeMiddleware";
import {Client,ClientConfig} from 'pg';
import datasource from "../session-05-starter/db/data-source"

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);
server.use("/employees", employeeRouter);

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


