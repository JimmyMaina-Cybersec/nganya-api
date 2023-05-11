import { PartialType } from '@nestjs/mapped-types';
import { CreateLipaNaMpesaDto } from './create-lipa-na-mpesa.dto';

export class UpdateLipaNaMpesaDto extends PartialType(CreateLipaNaMpesaDto) {}
