import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class PresenceService {
  joinRoom(user: { _id: string }, client: Socket) {
    // TODO: implement precence here
  }
}
