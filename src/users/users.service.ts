import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

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
  async addUser(
    createUserDto: CreateUserDto,
    user: JwtPayload,
  ) {
    if (await this.checkIfUserExists(createUserDto.idNo)) {
      if (user.role === 'Super User') {
        await this.userModel.create({
          ...createUserDto,
          createdBy: user._id,
          updatedBy: user._id,
        });
        return new HttpException(
          'User created successfully',
          HttpStatus.CREATED,
        );
      } else if (user.role === 'admin' || 'general admin') {
        await this.userModel.create({
          ...createUserDto,
          sacco: user.sacco,
          createdBy: user._id,
          updatedBy: user._id,
        });
        return new HttpException(
          'User created successfully',
          HttpStatus.CREATED,
        );
      } else if (user.role === 'station manager') {
        if (createUserDto.role === 'station agent') {
          await this.userModel.create({
            ...createUserDto,
            station: user.station,
            sacco: user.sacco,
            createdBy: user._id,
            updatedBy: user._id,
          });
          return new HttpException(
            'User created successfully',
            HttpStatus.CREATED,
          );
        }
      } else {
        return new HttpException(
          'You are not allowed to perform this action',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      return new HttpException(
        'User already exists',
        HttpStatus.CONFLICT,
      );
    }
  }

  /**
   * ### Find All Users
   * @param currentUser
   * @returns Array<UserDocument>
   */
  async findAllUsers(currentUser: JwtPayload) {
    switch (currentUser.role) {
      case 'Super User':
        return await this.userModel.find();
      case 'admin' || 'general admin':
        return await this.userModel
          .find({
            sacco: currentUser.sacco,
          })
          .select(
            '-password -refreshToken -updatedOn -updatedBy',
          );
      case 'station manager':
        return await this.userModel.find({
          station: currentUser.station,
        });
      default:
        return await this.userModel
          .find({
            _id: currentUser._id,
          })
          .select(
            '-password -refreshToken -updatedOn -updatedBy',
          );
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
          .select(
            '-password -refreshToken -updatedOn -updatedBy',
          );

      case 'admin' || 'general admin':
        return this.userModel
          .findOne({
            sacco: user.sacco,
            idNo,
          })
          .select(
            '-password -refreshToken -updatedOn -updatedBy',
          );

      case 'station manager':
        return this.userModel
          .findOne({
            station: user.station,
            idNo,
          })
          .select(
            '-password -refreshToken -updatedOn -updatedBy',
          );

      default:
        return new HttpException(
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

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    user: JwtPayload,
  ) {
    if (user.role === 'Super User') {
      return await this.userModel
        .findByIdAndUpdate(id, {
          ...updateUserDto,
          updatedAt: Date.now(),
          updatedBy: user._id,
        })
        .select(
          '-password -refreshToken -updatedOn -updatedBy',
        );
    } else if (user.role === 'admin' || 'general admin') {
      const UpdatingUser = await this.userModel.findById(
        id,
      );
      if (UpdatingUser.sacco === user.sacco) {
        return await this.userModel
          .findByIdAndUpdate(id, {
            ...updateUserDto,
            updatedAt: Date.now(),
            updatedBy: user._id,
          })
          .select(
            '-password -refreshToken -updatedOn -updatedBy',
          );
      }
      return new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    } else if (user.role === 'station manager') {
      const UpdatingUser = await this.userModel.findById(
        id,
      );
      if (
        UpdatingUser.station === user.station &&
        UpdatingUser.role === 'station agent'
      ) {
        return await this.userModel
          .findByIdAndUpdate(id, {
            ...updateUserDto,
            updatedAt: Date.now(),
            updatedBy: user._id,
          })
          .select(
            '-password -refreshToken -updatedOn -updatedBy',
          );
      }
    } else {
      return new HttpException(
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
    const deletingUser = await this.userModel.findById(id);
    if (deletingUser.role === 'Super User') {
      return new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.role === 'Super User') {
      await this.userModel.findByIdAndDelete(id);
      return 'User deleted successfully';
    }
    if (user.role === 'admin' || 'general admin') {
      if (deletingUser.sacco === user.sacco) {
        await this.userModel.findByIdAndDelete(id);
        return 'User deleted successfully';
      }
      return new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.role === 'station manager') {
      if (
        deletingUser.station === user.station &&
        deletingUser.role === 'station agent'
      ) {
        await this.userModel.findByIdAndDelete(id);
        return 'User deleted successfully';
      }
      return new HttpException(
        'You are not allowed to perform this action',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
