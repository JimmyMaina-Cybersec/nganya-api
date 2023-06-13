import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePresenceDto {
    @IsNotEmpty()
    @IsString()
    _id: string;
    
    @IsNotEmpty()
    @IsBoolean()
    online: boolean;

}
