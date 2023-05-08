import { PartialType } from '@nestjs/mapped-types';
import { CreateTestPresenceDto } from './create-test-presence.dto';

export class UpdateTestPresenceDto extends PartialType(CreateTestPresenceDto) {
  id: number;
}
