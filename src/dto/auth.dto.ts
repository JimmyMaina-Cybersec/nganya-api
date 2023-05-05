import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class LoginDto {
    @IsNumberString()
    @IsNotEmpty()
    readonly idNO: string;
    
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}