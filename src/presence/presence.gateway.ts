import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PresenceService } from './presence.service';
import { Server, Socket } from 'socket.io';
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from './presenceGuards/auth.guard';
@WebSocketGateway({namespace: 'presence'})
export class PresenceGateway {
  constructor(
    private readonly presenceService: PresenceService
    ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Namespace: ' + socket.nsp.name);
      console.log('Socket ID: ' + socket.id);
    });
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('onlineStatus')
  async joinRoom(
    @MessageBody() data: { _id: string; saccoId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.presenceService.joinRoom(data._id, data.saccoId, client);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('offlineStatus')
  async leaveRoom(
    @MessageBody() data: { _id: string; saccoId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.presenceService.leaveRoom(data._id, data.saccoId, client);
  }
}
