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
  private logger = new Logger(PresenceService.name);

  constructor(
    @InjectModel(Presence.name)
    private readonly presenceModel: Model<PresenceDocument>,
    private readonly presenceGateway: PresenceGateway,
  ) {}

async joinRoom(userId: string, saccoId: string, client: Socket): Promise<void> {
  try {
    const createPresenceDto: CreatePresenceDto = {
      userId,
      lastActiveTime: null, 
    };

    await this.presenceModel.findOneAndUpdate(
      { userId },
      createPresenceDto,
      { upsert: true },
    );

    client.join('sacco_${saccoId}');

    this.emitPresenceUpdate(userId, saccoId, true);

  } catch (error) {
    const errorMessage = 'Error occurred while joining the room';
    this.logger.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}

async leaveRoom(userId: string, saccoId: string, client: Socket): Promise<void> {
  try {
      const updatePresenceDto: Partial<UpdatePresenceDto> = {
        lastActiveTime: new Date(), 
      };
  
      await this.presenceModel.findOneAndUpdate(
        { userId },
        updatePresenceDto,
        { upsert: true },
      );
  
      client.leave('sacco_${saccoId}');

      this.emitPresenceUpdate(userId, saccoId, false);
    

  } catch (error) {
    const errorMessage = 'Error occurred while leaving the room';
    this.logger.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}

private emitPresenceUpdate(userId: string, saccoId: string, online: boolean): void {
  const roomName = `sacco_${saccoId}`; 
  const message = {
    userId,
    online,
    message: online ? '${userId} is now online' : '${userId} is now offline',
  };
  this.presenceGateway.server.to(roomName).emit('presenceUpdate', message);
}
}
