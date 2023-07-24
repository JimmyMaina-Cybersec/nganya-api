import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePercelDto } from './dto/create-percel.dto';
import { UpdatePercelDto } from './dto/update-percel.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { Model } from 'mongoose';
import { Percel, PercelDocument } from './schema/percel.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Availability, AvailabilityDocument } from 'src/schemas/Availability';
import PaginationQueryType from 'src/types/paginationQuery';
import { PercelQuery } from 'src/types/percelQuery';

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

  async findAll(user: JwtPayload, pagination: PaginationQueryType) {
    try {
      if (!user || !user.role) {
        throw new UnauthorizedException(
          'You are not authorised to access Percels',
        );
      }

      const query: PercelQuery = {};
      if (
        user.role === 'Super User' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        query.sacco = user.sacco;
      } else if (user.role === 'station manager') {
        query.$or = [
          { sendingStation: user.station },
          { receivingStation: user.station },
        ];
      } else if (user.role === 'station agent') {
        query.$or = [
          { sendingAgent: user._id },
          { pickupAgent: user._id },
          { recivingAgent: user._id },
        ];
      } else {
        throw new HttpException(
          'You are not allowed to view percels',
          HttpStatus.FORBIDDEN,
        );
      }

      const { page, resPerPage } = pagination;

      const [percels, totalCount] = await Promise.all([
        this.percelModel
          .find(query)
          .populate('sendingAgent', 'firstName secondName photoURL')
          .populate('receivingAgent', 'firstName secondName photoURL')
          .populate('sendingStation', 'firstName secondName photoURL')
          .skip(pagination.skip)
          .limit(pagination.resPerPage),
        this.percelModel.countDocuments(query),
      ]);

      return {
        data: percels,
        page,
        resPerPage,
        numberOfPages: Math.ceil(totalCount / resPerPage),
      };
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
