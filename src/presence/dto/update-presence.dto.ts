import { PartialType } from '@nestjs/mapped-types';
import { CreatePresenceDto } from './create-presence.dto';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdatePresenceDto extends PartialType(CreatePresenceDto) {
  
}
