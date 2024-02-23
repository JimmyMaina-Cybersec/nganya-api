import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from "class-validator";

export class SmsDto {
    @IsNotEmpty()
    @IsString({each: true})
    @IsArray()
    @ArrayNotEmpty()
    phones: string[];

    @IsNotEmpty()
    @IsString()
    message: string;
}