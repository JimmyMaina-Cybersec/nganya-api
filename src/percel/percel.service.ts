import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePercelDto } from './dto/create-percel.dto';
import { UpdatePercelDto } from './dto/update-percel.dto';
import { JwtPayload, OldJwtPayload } from 'src/types/jwt-payload';
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
  ) { }
  async sendPercel(createPercelDto: CreatePercelDto, agent: JwtPayload) {
    try {
      if (agent.user_metadata.station) {
        return await this.percelModel.create({
          ...createPercelDto,
          sendingAgent: agent.sub,
          sendingStation: agent.user_metadata.station,
          status: 'awaiting transit',
          sacco: agent.user_metadata.sacco,
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
      const query: PercelQuery = {};
        query.sacco = user.user_metadata.sacco;
        query.$or = [
          { sendingStation: user.user_metadata.station },
          { receivingStation: user.user_metadata.station },
        ];
        query.$or = [
          { sendingAgent: user.sub },
          { pickupAgent: user.sub },
          { recivingAgent: user.sub },
        ];

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
          updatedBy: user.sub,
        },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
