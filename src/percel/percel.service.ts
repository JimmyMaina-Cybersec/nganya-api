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
import { Pagination } from 'src/common/decorators/paginate.decorator';
import { UserRoles } from 'src/types/UserRoles';

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

  async getAgentPercels(agent: JwtPayload, pagination: PaginationQueryType) {
    try {
      if (agent.user_metadata.station) {
        const parcelQuery = await this.percelModel.find({
          sendingAgent: agent.sub,
        });
        const { page, resPerPage } = pagination;
        const [parcelInStation, docsCount] = await Promise.all([
          this.percelModel
            .find(parcelQuery)
            .skip(pagination.skip)
            .limit(pagination.resPerPage),
          this.percelModel.countDocuments(parcelQuery),
        ]);

        return {
          data: parcelInStation,
          page,
          resPerPage,
          numberOfPages: Math.ceil(docsCount / pagination.resPerPage),
        };
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async getStationPercels(
    stationManager: JwtPayload,
    pagination: PaginationQueryType,
  ) {
    try {
      if (stationManager.user_metadata.station) {
        const parcelQuery = await this.percelModel.find({
          sendingStation: stationManager.user_metadata.station,
        });
        const { page, resPerPage } = pagination;
        const [parcelInStation, docsCount] = await Promise.all([
          this.percelModel
            .find(parcelQuery)
            .populate('sendingAgent', 'firstName secondName photoURL')
            .populate('receivingAgent', 'firstName secondName photoURL')
            .skip(pagination.skip)
            .limit(pagination.resPerPage),
          this.percelModel.countDocuments(parcelQuery),
        ]);

        return {
          data: parcelInStation,
          page,
          resPerPage,
          numberOfPages: Math.ceil(docsCount / pagination.resPerPage),
        };
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getAllParcels(
    user: JwtPayload,
    stationId: string,
    pagination: PaginationQueryType,
  ) {
    try {
      const stationParcels = await this.percelModel.find({
        sendingStation: stationId,
      });
      const { page, resPerPage } = pagination;
      const [parcelInStation, docsCount] = await Promise.all([
        this.percelModel
          .find(stationParcels)
          .populate('sendingAgent', 'firstName secondName photoURL')
          .populate('receivingAgent', 'firstName secondName photoURL')
          .populate('recivingStation', 'name location phone photoURL')
          .skip(pagination.skip)
          .limit(pagination.resPerPage),
        this.percelModel.countDocuments(stationParcels),
      ]);

      return {
        data: parcelInStation,
        page,
        resPerPage,
        numberOfPages: Math.ceil(docsCount / pagination.resPerPage),
      };
    } catch (error) {
      throw new HttpException(error.message, error.data);
    }
  }
  async findAll(user: JwtPayload, pagination: PaginationQueryType) {
    try {
      let parcelQuery = null;
      if (user.user_roles.includes(UserRoles.GENERAL_ADMIN)) {
        parcelQuery = await this.percelModel
          .find({
            sacco: user.user_metadata.sacco,
          })
          .exec();
      }
      if (user.user_roles.includes(UserRoles.STATION_MANAGER)) {
        parcelQuery = await this.percelModel
          .find({
            sendingStation: user.user_metadata.station,
          })
          .exec();
      }
      if (user.user_roles.includes(UserRoles.SERVICE_AGENT)) {
        parcelQuery = await this.percelModel
          .find({
            sendingAgent: user.sub,
          })
          .exec();
      }

      const { page, resPerPage } = pagination;

      const [percels, totalCount] = await Promise.all([
        this.percelModel
          .find(parcelQuery)
          .populate('sendingAgent', 'firstName secondName photoURL')
          .populate('receivingAgent', 'firstName secondName photoURL')
          .populate('sendingStation', 'name location phone photoURL')
          .skip(pagination.skip)
          .limit(pagination.resPerPage),
        this.percelModel.countDocuments(parcelQuery),
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
