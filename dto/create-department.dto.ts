import { IsNotEmpty, IsNumber, isNumber, IsString,IsOptional} from "class-validator";

export class createDepartmentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  dpt_name?: string;
}