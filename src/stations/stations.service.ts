import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station, StationDocument } from './schema/station.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'src/types/jwt-payload';
import { StationQuery } from 'src/types/stationQuery';
import { UpdateStationsDestinationsDTO } from './dto/update-destinations.dto';
import { ManagementClient } from 'auth0';

@Injectable()
export class StationsService {

  constructor(
    @InjectModel(Station.name)
    private readonly stationModel: Model<StationDocument>,
  ) { }

  async findOneStation(user: JwtPayload, id: string) {
    const client_id: string = 'sy6vl7Klm5UxsoMvKHlBmF4L2dtqTcp3';
    const client_secret: string =
      'CBGF9Ab9iCoaO6pxrVzzxglop6A8JteUI_EBFWr3iIkG0mPDjro8UucWnTqqLHOO';
    const managementClient = new ManagementClient({
      domain: 'nganya.us.auth0.com',
      clientId: client_id,
      clientSecret: client_secret,
      scope: 'create:users delete:users',
    });

    const agents = await managementClient.getUsers({
      q: `user_metadata.station:${id}`,
    });

    const station = await this.stationModel.findById(id);
    return {
      station,
      users: agents
    }

    // return this.stationModel.findOne({
    //   _id: id,
    //   sacco: user.sacco,
    // });

    // return this.stationModel.findOne({
    //   _id: id,
    //   sacco: user.sacco,
    // });
  }

  async createStation(createStationDto: CreateStationDto, user: JwtPayload) {
    try {
      return await this.stationModel.create({
        ...createStationDto,
        sacco: user.user_metadata.sacco,
        addedBy: user.sub,
      });


    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.BAD_REQUEST);
    }

    // return 'This action adds a new station';
  }

  /**
   * ### Get All Stations
   * @param user
   * @returns Promise<Station[]>
   *  */

  async findAll(user: JwtPayload, pagination) {
    try {
      const query: StationQuery = {};
      let stationQuery: any = this.stationModel
        .find(query)
        .select('_id name location stret');

      stationQuery = stationQuery
        .where('sacco')
        .equals(user.user_metadata.sacco);

      const { page, resPerPage } = pagination;

      const [station, totalCount] = await Promise.all([
        stationQuery.skip(pagination.skip).limit(pagination.resPerPage),
        this.stationModel.countDocuments(query),
      ]);

      return {
        data: station,
        page,
        resPerPage,
        numberOfPages: Math.ceil(totalCount / resPerPage),
      };
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
    await this.stationModel.findByIdAndUpdate(stationID, {
      ...updateStationDto,
      updatedBy: user.sub,
      updatedAt: Date.now(),
    });

    HttpStatus.OK;
    return {
      message: 'Station updated successfully',
    };
  }

  async remove(id: string, user: JwtPayload) {
    try {
      // await this.stationModel.findByIdAndDelete(id);

      await this.stationModel.findOneAndDelete({
        _id: id,
        sacco: user.user_metadata.sacco,
      });

      throw new HttpException('Station deleted successfully', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  updateStationsDestinations(currentUser: JwtPayload, updateStationDto: UpdateStationsDestinationsDTO) {
    return this.stationModel.findByIdAndUpdate(
      currentUser.user_metadata.station, {
      $addToSet: { destinations: { "$each": updateStationDto.destinations } },
    }, {
      new: true
    }
    )

  }
}
