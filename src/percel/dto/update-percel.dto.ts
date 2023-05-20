import { PartialType } from '@nestjs/mapped-types';
import { CreatePercelDto } from './create-percel.dto';

export class UpdatePercelDto extends PartialType(CreatePercelDto) {}
