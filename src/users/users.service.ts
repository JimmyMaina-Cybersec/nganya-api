import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';
import { CreateUserDto } from './dto/create-user.dto';
import { FindStationAgentsDto } from './dto/find-station-agents.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async assingManager(
    queryData: { station: string; userId: string },
    currentUser: JwtPayload,
  ) {
    try {
      const user = await this.userModel.findById(queryData.userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.role !== 'station manager') {
        throw new HttpException(
          'You can only assign station manager to as managers',
          HttpStatus.FORBIDDEN,
        );
      }

      if (user.station) {
        throw new HttpException(
          'User already assigned to a station',
          HttpStatus.FORBIDDEN,
        );
      }

      if (
        currentUser.role == 'admin' ||
        currentUser.role == 'Super User' ||
        currentUser.role == 'general admin'
      ) {
        await this.userModel.findByIdAndUpdate(queryData.userId, {
          station: queryData.station,
        });
      } else {
        throw new HttpException(
          'You are not allowed to assign station manager',
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException(
        'User Added to station successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async checkIfUserExists(idNo: string): Promise<boolean> {
    const exists = await this.userModel.exists({
      idNo: idNo,
    });
    if (exists) {
      return true;
    }
    return false;
  }

  /**
   * ### Add User
   *
   * @param createUserDto
   * @param user
   * @returns Object
   */
  async addUser(createUserDto: CreateUserDto, user: JwtPayload) {
    try {
      if (await this.checkIfUserExists(createUserDto.idNo)) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      if (
        user.role === 'Super User' ||
        user.role === 'admin' ||
        user.role === 'general admin'
      ) {
        await this.userModel.create({
          ...createUserDto,
          status: 'active',
          sacco: user.sacco,
          createdBy: user._id,
          updatedBy: user._id,
        });
        throw new HttpException(
          'User created successfully',
          HttpStatus.CREATED,
        );
      } else if (user.role === 'station manager') {
        if (createUserDto.role === 'station agent') {
          return await this.userModel.create({
            ...createUserDto,
            status: 'active',
            station: user.station,
            sacco: user.sacco,
            createdBy: user._id,
            updatedBy: user._id,
          });
        }
      } else {
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * ### Find All Users
   * @param currentUser
   * @returns Array<UserDocument>
   */
  async findAllUsers(currentUser: JwtPayload, query: any) {
    switch (currentUser.role) {
      case 'Super User':
        return await this.userModel
          .find({
            sacco: currentUser.sacco,
            ...query,
          })
          .select('-password -refreshToken');
      case 'general admin':
        return await this.userModel
          .find({
            sacco: currentUser.sacco,
            ...query,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      case 'admin':
        return await this.userModel
          .find({
            sacco: currentUser.sacco,
            ...query,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      case 'station manager':
        return await this.userModel
          .find({
            station: currentUser.station,
            ...query,
          })
          .or([
            { role: 'station agent' },
            { role: 'driver' },
            { role: 'station manager' },
          ]);
      default:
        return await this.userModel
          .find({
            _id: currentUser._id,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
    }
  }

  /**
   * ### Find a User
   * @param idNo
   * @param user
   * @returns Object<UserDocument>
   * */
  async findUser(idNo: string, user: JwtPayload) {
    switch (user.role) {
      case 'Super User':
        return this.userModel
          .findById(idNo)
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'general admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            _id: idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            _id: idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'station manager':
        return this.userModel
          .findOne({
            station: user.station,
            __id: idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      default:
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
    }
  }

  /**
   * ### Find a User
   * @param idNo
   * @param user
   * @returns Object<UserDocument>
   * */
  async findUserById(idNo: { idNo: string }, user: JwtPayload) {
    switch (user.role) {
      case 'Super User':
        return this.userModel
          .findOne({
            idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'general admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      case 'station manager':
        return this.userModel
          .findOne({
            station: user.station,
            idNo,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');

      default:
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
    }
  }

  /**
   * ### Update a User
   *
   * @param id
   * @param updateUserDto
   * @param user
   * @returns Object<UserDocument>
   *
   * */

  async updateUser(id: string, updateUserDto: UpdateUserDto, user: JwtPayload) {
    if (
      user.role === 'Super User' ||
      user.role === 'admin' ||
      user.role === 'general admin'
    ) {
      const UpdatingUser = await this.userModel.findById(id);
      if (UpdatingUser.sacco == user.sacco) {
        return await this.userModel
          .findByIdAndUpdate(id, {
            ...updateUserDto,
            updatedAt: Date.now(),
            updatedBy: user._id,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      }
      throw new HttpException(
        'You are not allowed to perform this action as a general admin',
        HttpStatus.FORBIDDEN,
      );
    } else if (user.role === 'station manager') {
      const UpdatingUser = await this.userModel.findById(id);
      if (
        UpdatingUser.station == user.station &&
        UpdatingUser.role == 'station agent'
      ) {
        return await this.userModel
          .findByIdAndUpdate(id, {
            ...updateUserDto,
            updatedAt: Date.now(),
            updatedBy: user._id,
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      }
    } else {
      throw new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  /**
   * ### Delete a User
   *
   * @param id
   * @param user
   * @returns
   *
   */

  async deleteUser(id: string, user: JwtPayload) {
    try {
      const deletingUser = await this.userModel.findById(id);
      if (deletingUser.role === 'Super User') {
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
      }

      if (user.role === 'Super User') {
        await this.userModel.findByIdAndDelete(id);
        return 'User deleted successfully';
      } else if (user.role === 'admin' || user.role === 'general admin') {
        if (
          // TODO: only delete user in a sacoo
          // !currently not working
          // deletingUser.sacco === user.sacco &&
          deletingUser.role !== 'general admin'
        ) {
          await this.userModel.findByIdAndDelete(id);
          throw new HttpException('Delete Success', HttpStatus.OK);
        }
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
      } else if (user.role === 'station manager') {
        if (
          // TODO: only delete user in a station
          // !currently not working
          // deletingUser.station === user.station &&
          deletingUser.role === 'station agent'
        ) {
          await this.userModel.findByIdAndDelete(id);
          return 'User deleted successfully';
        }
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
      } else {
        throw new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAgentsInStation(user: JwtPayload, station: FindStationAgentsDto) {
    try {
      if (
        user.role === 'admin' ||
        user.role === 'general admin' ||
        user.role === 'Super User'
      ) {
        return await this.userModel
          .find({
            sacco: user.sacco,
            station: station.station,
            role: 'station agent',
          })

          .select('-password -refreshToken -upadatedAt -updatedBy');
      } else if (user.role === 'station manager') {
        return await this.userModel
          .find({
            station: user.station,
            role: 'station agent',
          })
          .select('-password -refreshToken -upadatedAt -updatedBy');
      }

      throw new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.NOT_FOUND,
      );
    }
  }

  async findStationManager(user: JwtPayload, station: { station: string }) {
    try {
      return await this.userModel
        .findOne({
          sacco: user.sacco,
          station: station.station,
          role: 'station manager',
        })
        .select('phone photoURL firstName secondName email idNo');
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
