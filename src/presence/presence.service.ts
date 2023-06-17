import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Presence, PresenceDocument } from './entities/presence.entity';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { PresenceGateway } from './presence.gateway';

@Injectable()
export class PresenceService {
  private userRooms: Map<string, string>;
  private logger = new Logger(PresenceService.name);

  constructor(
    @InjectModel(Presence.name)
    private readonly presenceModel: Model<PresenceDocument>,
    private readonly presenceGateway: PresenceGateway,
  ) {
    this.userRooms = new Map<string, string>();
  }

async joinRoom(userId: string, sacco: string, client: Socket): Promise<void> {
  try {
    const createPresenceDto: CreatePresenceDto = {
      userId,
      sacco,
      lastActiveTime: null, 
    };

    await this.presenceModel.findOneAndUpdate(
      { userId, sacco },
      createPresenceDto,
      { upsert: true },
    );

    client.join('sacco_${sacco}');

    this.emitPresenceUpdate(userId, sacco, true);

  } catch (error) {
    const errorMessage = 'Error occurred while joining the room';
    this.logger.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}

async leaveRoom(userId: string, sacco: string, client: Socket): Promise<void> {
  try {
      const updatePresenceDto: Partial<UpdatePresenceDto> = {
        lastActiveTime: new Date(), 
      };
  
      await this.presenceModel.findOneAndUpdate(
        { userId, sacco },
        updatePresenceDto,
        { upsert: true },
      );
  
      client.leave('sacco_${sacco}');

      this.emitPresenceUpdate(userId, sacco, false);
    

  } catch (error) {
    const errorMessage = 'Error occurred while leaving the room';
    this.logger.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}

private emitPresenceUpdate(userId: string, sacco: string, online: boolean): void {
  const roomName = `sacco_${sacco}`; 
  this.presenceGateway.server.to(roomName).emit('presenceUpdate', { userId, online });
}
}
