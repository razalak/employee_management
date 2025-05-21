import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entities/employee.entity";

const datasource=new DataSource({
    type:'postgres',
    host:'localhost',
    port:5432,
    database:'training',
    username:'postgres',
    password:'postgres',
    extra:{max:5,min:2},
    synchronize:true,
    logging:true,
    namingStrategy:new SnakeNamingStrategy(),
    entities:[Employee]
});

export default datasource;