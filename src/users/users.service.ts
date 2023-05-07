import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  User,
  UserDocument,
} from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  addUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(currentUser: JwtPayload) {
    switch (currentUser.role) {
      case 'Super User':
        return await this.userModel.find();
      case 'admin':
        console.log(currentUser);

        return await this.userModel.find({
          sacco: currentUser.sacco,
        });

      case 'general admin':
        return await this.userModel.find({
          sacco: currentUser.sacco,
        });

      case 'station manager':
        return await this.userModel.find({
          station: currentUser.station,
        });
      default:
        return await this.userModel.find({
          _id: currentUser._id,
        });
    }
  }

  findOne(idNo: string) {
    return `This action returns a #${idNo} user`;
  }

  update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
