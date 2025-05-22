import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, isString, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { createAddressDto } from "./create-address.dto";
import { Column } from "typeorm";
import { EmployeeRole } from "../entities/employee.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  password:string;

  @ValidateNested()
  @Type(()=>createAddressDto)
  address:createAddressDto;

  @IsEnum(EmployeeRole)
  role:EmployeeRole;

}