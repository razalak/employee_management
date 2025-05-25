import { IsEmail, isNotEmpty, IsNotEmpty, IsString,IsOptional} from "class-validator";

export class createAddressDto {
  @IsNotEmpty()
  houseno:number;

  @IsNotEmpty()
  line_1: string;

   @IsOptional()
    line_2?: string;
}