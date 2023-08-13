import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateSaccoGeneralAdmin extends CreateUserDto {

    @IsString()
    sacco: string;


}
