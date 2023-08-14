import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/types/jwt-payload';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import PaginationQueryType from 'src/types/paginationQuery';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';
import { CreateSaccoUserDto } from './dto/create-sacco-user.dto';
import { RoleIdType } from '../types/RoleIdType';
import AssignStationManageDto from './dto/assign-sation-manage.dto';
import { UserRoles } from '../types/UserRoles';

@Injectable()
export class UsersService {
  private readonly client_id: string = 'sy6vl7Klm5UxsoMvKHlBmF4L2dtqTcp3';
  private readonly client_secret: string =
    'CBGF9Ab9iCoaO6pxrVzzxglop6A8JteUI_EBFWr3iIkG0mPDjro8UucWnTqqLHOO';
  private readonly managementClient = new ManagementClient({
    domain: 'nganya.us.auth0.com',
    clientId: this.client_id,
    clientSecret: this.client_secret,
    scope: 'create:users',
  });

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private configurationService: ConfigService,
  ) { }

  async createSaccoUsers(
    currentUser: JwtPayload,
    createUserDto: CreateSaccoUserDto,
  ) {
    try {
      const newUser = await this.addUser(currentUser, createUserDto);
      await this.addUserRoles(newUser.user_id, [createUserDto.role]);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createAdmins(
    currentUser: JwtPayload,
    createUserDto: CreateSaccoUserDto,
  ) {
    try {
      const newUser = await this.addUser(currentUser, createUserDto);
      await this.addUserRoles(newUser.user_id, [RoleIdType.ADMIN]);

      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createServiceAgent(
    currentUser: JwtPayload,
    createUserDto: CreateSaccoUserDto,
  ) {
    try {
      const newUser = await this.addUser(currentUser, createUserDto);
      await this.addUserRoles(newUser.user_id, [RoleIdType.SERVICE_AGENT]);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignUserToStation(
    body: AssignStationManageDto,
    currentUser: JwtPayload,
  ) {
    return await this.updateUserMetaData(body.userId, {
      station: body.station,
    });
  }

  async assignManagerToStation(
    body: AssignStationManageDto,
    currentUser: JwtPayload,
  ) {
    const manager = await this.managementClient.getUsers({
      q: `user_metadata.sacco:${currentUser.user_metadata.sacco} AND user_metadata.station:${body.station} AND user_metadata.role:Station Manager`,
    });

    if (manager.length > 0) {
      throw new HttpException(
        'This station already has a manager',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.updateUserMetaData(body.userId, {
      station: body.station,
    });
  }

  /**
   * ### Find All Users
   * @param currentUser
   * @param pagination
   * @param filters
   * @returns Array<UserDocument>
   */
  async findAllUsers(
    currentUser: JwtPayload,
    pagination: PaginationQueryType,
    filters: {
      role?: string;
      station?: string;
    },
  ) {
    try {
      return await this.managementClient.getUsers({
        q: `user_metadata.sacco:${currentUser.user_metadata.sacco
          }`,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllManagers(
    currentUser: JwtPayload,
    pagination: PaginationQueryType,
  ) {
    try {
      return await this.managementClient.getUsers({
        q: `user_metadata.sacco:${currentUser.user_metadata.sacco}`,

      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllAdmins(
    currentUser: JwtPayload,
    pagination: PaginationQueryType,
  ) {
    try {
      return await this.managementClient.getUsers({
        q: `user_metadata.sacco:${currentUser.user_metadata.sacco} AND user_metadata.role:Administrator`,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllAgents(
    currentUser: JwtPayload,
    pagination: PaginationQueryType,
  ) {
    try {
      return await this.managementClient.getUsers({
        q: `user_metadata.station:${currentUser.user_metadata.station} AND user_metadata.role:Station Agent`,
        // sort: 'created_at:1',
        // page: pagination.page ?? 1,
        // per_page: pagination.resPerPage ?? 20,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllStationManagers(
    currentUser: JwtPayload,
    pagination: PaginationQueryType,
  ) {
    try {
      return await this.managementClient.getUsers({
        q: `user_metadata.sacco:${currentUser.user_metadata.sacco} AND user_metadata.role:Station Manager`,
        // sort: 'created_at:1',
        // page: pagination.page ?? 1,
        // per_page: pagination.resPerPage ?? 20,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllDrivers(
    currentUser: JwtPayload,
    pagination: PaginationQueryType,
  ) {
    try {
      return await this.managementClient.getUsers({
        q: `user_metadata.sacco:${currentUser.user_metadata.sacco} AND user_metadata.role:Driver`,
        // sort: 'created_at:1',
        // page: pagination.page ?? 1,
        // per_page: pagination.resPerPage ?? 20,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
    throw new HttpException(
      'Methode Not Implemented',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  async deleteUser(id: string, user: JwtPayload) {
    throw new HttpException(
      'Methode Not Implemented',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }

  /**
   * ## Creates a new Auth0 user
   * @param currentUser
   * @param createUserDto
   * @returns Promise<User<AppMetadata, UserMetadata>>;
   * */
  async addUser(currentUser: JwtPayload, createUserDto: CreateSaccoUserDto) {
    return await this.managementClient.createUser({
      email: createUserDto.email,
      user_metadata: {
        sacco: currentUser.user_metadata.sacco,
        station: createUserDto.station ?? null,
        role: createUserDto.role ?? UserRoles.SERVICE_AGENT,
        addedBy: currentUser.sub,
      },
      app_metadata: {},
      given_name: createUserDto.firstName,
      family_name: createUserDto.lastName,
      connection: 'Username-Password-Authentication',
      password: `${createUserDto.idNo}@${createUserDto.firstName}`,
    });
  }

  /**
   * ## Add User Roles
   * @param userId
   * @param roles
   */
  async addUserRoles(userId: string, roles: string[]) {
    try {
      return await this.managementClient.assignRolestoUser(
        {
          id: userId,
        },
        {
          roles,
        },
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateUserMetaData(userId: string, metadata: Record<string, any>) {
    try {
      return await this.managementClient.updateUserMetadata(
        {
          id: userId,
        },
        metadata,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async CheckIfUserExist(
    currentUser: JwtPayload,
    metadataKey: string,
    metadataValue: string,
  ) {
    try {
      const users = await this.managementClient.getUsers({
        q: `user_metadata.sacco:${currentUser.user_metadata.sacco} AND user_metadata.${metadataKey}:${metadataValue}`,
      });
      return users.length > 0;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
