import { IsDate, IsDateString, IsEmail, isEnum, IsEnum, isNotEmpty, IsNotEmpty, isNumber, IsNumber, isString, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { createAddressDto } from "./create-address.dto";
import { Column, Unique } from "typeorm";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import { createDepartmentDto } from "./create-department.dto";

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

  @ValidateNested()
  @Type(() => createDepartmentDto)
  department: createDepartmentDto;

  @IsEnum(EmployeeStatus)
  status:EmployeeStatus;

  @IsNumber()
  experience:number;

  @IsDateString()
  joiningdate:Date; 

  @IsNotEmpty()
  employeeId:string;
}