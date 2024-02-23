import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteAvailabilitDto{
    @IsNotEmpty()
    @IsString()
    id: string;
}