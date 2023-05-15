import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station, StationDocument } from './schema/station.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class StationsService {
  constructor(
    @InjectModel(Station.name)
    private readonly stationModel: Model<StationDocument>,
  ) {}

  findOneStation(user: JwtPayload, id: string) {
    switch (user.role) {
      case 'Super User':
        return this.stationModel.findById(id);

      case 'general admin':
        return this.stationModel.findOne({
          _id: id,
          sacco: user.sacco,
        });
      
        case 'admin' :
        return this.stationModel.findOne({
          _id: id,
          sacco: user.sacco,
        });

      default:
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
    }
  }

  async createSacco(createStationDto: CreateStationDto, user: JwtPayload) {
    if (
      user.role == 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      try {
        await this.stationModel.create({
          ...createStationDto,
          sacco: user.sacco,
          addedBy: user._id,
        });

        return {
          message: 'Station created successfully',
        };
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
    return 'This action adds a new station';
  }

  /**
   * ### Get All Stations
   * @param user
   * @returns Promise<Station[]>
   *  */

  async findAll(user: JwtPayload) {
    try {
      switch (user.role) {
        case 'Super User':
          return await this.stationModel
            .find()
            .select('_id name location street');
        case  'general admin':
          return await this.stationModel.find({
            sacco: user.sacco,
          });
      
       case 'admin' :
          return await this.stationModel.find({
            sacco: user.sacco,
          });
        default:
          return await this.stationModel
            .find({
              sacco: user.sacco,
            })
            .select('_id name location street');
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   *
   * ### Get current Users Station
   * @param userStationID
   *
   * @returns Promise<Station>
   */
  async myStation(userStationID: string) {
    const station = await this.stationModel.findById(userStationID);
    if (!station) {
      throw new HttpException(
        'You are not assigned to any station',
        HttpStatus.NOT_FOUND,
      );
    }
    return station;
  }

  /**
   *
   * ### Update Station
   * @param user
   * @param updateStationDto
   * @param stationID
   *
   * @returns Promise<{message: string}>
   *
   * */
  async updateStation(
    user: JwtPayload,
    updateStationDto: UpdateStationDto,
    stationID: string,
  ) {
    if (
      user.role == 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin' ||
      user.role === 'station manager'
    ) {
      await this.stationModel.findByIdAndUpdate(stationID, {
        ...updateStationDto,
        updatedBy: user._id,
        updatedAt: Date.now(),
      });

      HttpStatus.OK;
      return {
        message: 'Station updated successfully',
      };
    } else {
      throw new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async remove(id: string, user: JwtPayload) {
    try {
      if (user.role === 'Super User') {
        await this.stationModel.findByIdAndDelete(id);
      }
      if (user.role === 'admin' || user.role === 'general admin') {
        await this.stationModel.findOneAndDelete({
          _id: id,
          sacco: user.sacco,
        });
      } else {
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException('Station deleted successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
