import { IsEmail, IsNotEmpty, IsString} from "class-validator";

export class createAddressDto {
  @IsNotEmpty()
  // @IsEmail()
  line1: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;
}