import { Injectable } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';

@Injectable()
export class PresenceService {
  joinRoom(createPresenceDto: CreatePresenceDto) {
    return 'This action adds a new presence';
  }
}
