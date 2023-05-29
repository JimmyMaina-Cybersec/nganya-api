import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class PresenceGateway {
  constructor(private readonly presenceService: PresenceService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Namespace: ' + socket.nsp.name);
      console.log('Socket ID: ' + socket.id);
    });
  }

  @SubscribeMessage('onlineStatus')
  joinRoom(
    @MessageBody() user: { _id: string },
    @ConnectedSocket() client: Socket,
  ) {
    return this.presenceService.joinRoom(user, client);
  }
}
