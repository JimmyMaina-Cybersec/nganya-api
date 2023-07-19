import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePercelDto } from './dto/create-percel.dto';
import { UpdatePercelDto } from './dto/update-percel.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { Model } from 'mongoose';
import { Percel, PercelDocument } from './schema/percel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Availability, AvailabilityDocument } from 'src/schemas/Availability';

@Injectable()
export class PercelService {
  constructor(
    @InjectModel(Percel.name)
    private readonly percelModel: Model<PercelDocument>,
    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<AvailabilityDocument>,
  ) {}
  async sendPercel(createPercelDto: CreatePercelDto, agent: JwtPayload) {
    try {
      if (agent.station) {
        return await this.percelModel.create({
          ...createPercelDto,
          sendingAgent: agent._id,
          sendingStation: agent.station,
          status: 'awaiting transit',
          sacco: agent.sacco,
        });
      }
      throw new HttpException(
        'Only station managers and station agents with permission to add availabilities can add availabilities',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll(user: JwtPayload, query: any) {
    try {
      if (
        user.role === 'Super User' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        return this.percelModel.find({ ...query, sacco: user.sacco });
      }
      if (user.role === 'station manager') {
        return this.percelModel
          .find({ ...query })
          .or([
            { sendingStation: user.station },
            { recivingStation: user.station },
          ])
          .populate('sendingAgent', 'firstName secondName photoURL ')
          .populate('recivingAgent', 'firstName secondName photoURL ')
          .populate('sendingStation', 'firstName secondName photoURL');
      }
      if (user.role === 'station agent') {
        return this.percelModel
          .find({ ...query })
          .or([
            { sendingAgent: user._id },
            { pickupAgent: user._id },
            { recivingAgent: user._id },
          ])
          .populate('sendingStation');
      }

      throw new HttpException(
        'You are not authorized to perform this action',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  update(user: JwtPayload, id: string, updatePercelDto: UpdatePercelDto) {
    try {
      return this.percelModel.findByIdAndUpdate(
        id,
        {
          ...updatePercelDto,
          updatedAt: new Date(),
          updatedBy: user._id,
        },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
