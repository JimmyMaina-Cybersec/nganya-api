import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Model } from "mongoose";
import { Presence, PresenceDocument } from "./entities/presence.entity";
import { InjectModel } from '@nestjs/mongoose';
import { CreatePresenceDto } from "./dto/create-presence.dto";
import { UpdatePresenceDto } from "./dto/update-presence.dto";
import { PresenceGateway } from './presence.gateway';

@Injectable()
export class PresenceService {
  constructor(
    @InjectModel(Presence.name) 
    private readonly presenceModel: Model<PresenceDocument>,
    @Inject(forwardRef(() => PresenceGateway))
    private readonly presenceGateway: PresenceGateway,
    ) {}

  async joinRoom(user: { _id: string }, client: Socket): Promise<void> {
    try {
      const createPresenceDto: CreatePresenceDto = {
        _id: user._id,
        online: true,
      };
      
      await this.presenceModel.findOneAndUpdate(
        { user: user._id},
        createPresenceDto,
        { upsert: true },
      );
  
      this.emitPresenceUpdate(user._id, true);
      
    } catch (error) {
      const errorMessage = 'Error occured while joining the room';
      throw new Error(errorMessage);
    }
  }
  async leaveRoom(user: { _id: string }): Promise<void> {
    try {
      const updatePresenceDto: Partial<UpdatePresenceDto> = {
        online:false,
        updatedAt: new Date(),
      };
  
      await this.presenceModel.findOneAndUpdate(
        { user: user._id},
        updatePresenceDto,
        { upsert: true },
      );
  
      this.emitPresenceUpdate(user._id, false);
      
    } catch (error) {
      const errorMessage = 'Error occured while leaving the room';
      throw new Error(errorMessage);
    }
  }

  private emitPresenceUpdate(userId: string, online: boolean): void {
    this.presenceGateway.server.emit('presenceUpdate', { userId, online });
  }

}

