import { PartialType } from '@nestjs/mapped-types';
import { CreateSaccoDto } from './create-sacco.dto';

export class UpdateSaccoDto extends PartialType(CreateSaccoDto) {}
