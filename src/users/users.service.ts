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
import AssignUserToStationDto from './dto/assign-sation-manage.dto';
import { UserRoles } from '../types/UserRoles';
import RemoveUserFromStationDto from './dto/remove-station-manage.dto copy';
import { AssignDriverToVehicleDto } from './dto/assign_driver_to_vehicle.dto';
import { Vehicle } from 'src/vehicles/schema/vehicle.schema';

@Injectable()
export class UsersService {
  private readonly client_id: string = 'sy6vl7Klm5UxsoMvKHlBmF4L2dtqTcp3';
  private readonly client_secret: string =
    'CBGF9Ab9iCoaO6pxrVzzxglop6A8JteUI_EBFWr3iIkG0mPDjro8UucWnTqqLHOO';
  private readonly managementClient = new ManagementClient({
    domain: 'nganya.us.auth0.com',
    clientId: this.client_id,
    clientSecret: this.client_secret,
    scope: 'create:users delete:users',
  });

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<Vehicle>,
    private configurationService: ConfigService,
  ) { }

  async createSaccoUsers(
    currentUser: JwtPayload,
    createUserDto: CreateSaccoUserDto,
  ) {
    try {
      const newUser = await this.addUser(currentUser, createUserDto);
      if (createUserDto.role === 'Station Manager') {
        await this.addUserRoles(newUser.user_id, [RoleIdType.STATION_MANAGER]);
      } else if (createUserDto.role === 'Driver') {
        await this.addUserRoles(newUser.user_id, [RoleIdType.DRIVER]);
      } else if (createUserDto.role === 'Service Agent') {
        await this.addUserRoles(newUser.user_id, [RoleIdType.SERVICE_AGENT]);
      } else {
        throw new HttpException(
          'Invalid user role',
          HttpStatus.BAD_REQUEST,
        );
      }

      this.managementClient.updateUserMetadata(
        { id: newUser.user_id },
        {
          sacco: currentUser.user_metadata.sacco,
          station: createUserDto.station ?? null,
          role: createUserDto.role
        },

      );
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
      await this.managementClient.updateUserMetadata(
        { id: newUser.user_id },
        { station: currentUser.user_metadata.station },
      );
      await this.addUserRoles(newUser.user_id, [RoleIdType.SERVICE_AGENT]);
      await this.managementClient.updateUserMetadata({
        id: newUser.user_id,
      }, {
        station: currentUser.user_metadata.station,
      })
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addAgentPermissions(
    serviceAgentId: string,
    permissionsToAdd: string[],
  ) {
    try {
      const user = await this.managementClient.getUser({ id: serviceAgentId });
      if (!user) {
        throw new HttpException(
          'Service Agent not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const userRole = await this.managementClient.getUserRoles({
        id: serviceAgentId,
      });

      const isServiceAgent = userRole.some(
        (role: { id: RoleIdType }) => role.id === RoleIdType.SERVICE_AGENT,
      );
      if (isServiceAgent) {
        user.user_metadata.permissions.push(...permissionsToAdd);
      }

      return await this.managementClient.updateUserMetadata(
        { id: serviceAgentId },
        { permissions: user.user_metadata.permissions },
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async removeAgentPermissions(
    serviceAgentId: string,
    permissionsToRemove: string[],
  ) {
    try {
      const user = await this.managementClient.getUser({ id: serviceAgentId });
      if (!user) {
        throw new HttpException(
          'Service Agent not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const userRole = await this.managementClient.getUserRoles({
        id: serviceAgentId,
      });

      const isServiceAgent = userRole.some(
        (role: { id: RoleIdType }) => role.id === RoleIdType.SERVICE_AGENT,
      );

      let updatedPermissions: string[] = [...user.user_metadata.permissions];
      if (isServiceAgent) {
        updatedPermissions = user.user_metadata.permissions.filter(
          (permission: string) => !permissionsToRemove.includes(permission),
        );
      }

      return await this.managementClient.updateUserMetadata(
        { id: serviceAgentId },
        { permissions: updatedPermissions },
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignAgentToStation(body: AssignUserToStationDto) {
    try {
      const agent = await this.managementClient.getUser({ id: body.userId });

      // const agentHasStation = await this.managementClient.getUsers({
      //   q: `_exists_:user_metadata.station:${agent.user_metadata.station}`,
      // });
      // console.log(agentHasStation);

      // if (!agentHasStation) {
      return await this.updateUserMetaData(body.userId, {
        station: body.station,
      });
      // } else {
      //   throw new HttpException(
      //     'Agent already has a station',
      //     HttpStatus.CONFLICT,
      //   );
      // }
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeAgentFromStation(body: RemoveUserFromStationDto) {
    try {
      return await this.updateUserMetaData(body.userId, {
        station: null,
      });

    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignManagerToStation(body: AssignUserToStationDto) {
    try {
      const manager = await this.managementClient.getUser({ id: body.userId });
      // q: `_exists_:user_metadata.station:${manager.user_metadata.station}`;
      const managerHasStation = await this.managementClient.getUsers({
        q: `_exists_:user_metadata.station:${manager.user_metadata.station}`,
      });
      if (!managerHasStation) {
        return await this.updateUserMetaData(body.userId, {
          station: body.station,
        });
      } else {
        return {
          message: 'Manager already has a station',
        };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
        q: `user_metadata.sacco:${currentUser.user_metadata.sacco}`,
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

  async deleteAdmin(adminId: string) {
    try {
      const user = await this.managementClient.getUser({ id: adminId });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const userRole = await this.managementClient.getUserRoles({
        id: adminId,
      });

      const isAdmin = userRole.some((role) => role.id === RoleIdType.ADMIN);

      if (!isAdmin) {
        throw new HttpException(
          'User is not an administrator',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.managementClient.deleteUser({ id: adminId });

      return { message: 'Admin user deleted successfully' };
    } catch (error) {
      console.error('Error deleting admin:', error.message);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteAgent(agentId: string) {
    try {
      const userRole = await this.managementClient.getUserRoles({
        id: agentId,
      });

      const isAgent = userRole.some(
        (role) => role.id === RoleIdType.SERVICE_AGENT
      );

      if (!isAgent) {
        throw new HttpException(
          'User is not an administrator',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.managementClient.deleteUser({ id: agentId });

      return { message: 'Admin user deleted successfully' };
    } catch (error) {
      console.error('Error deleting admin:', error.message);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteSaccoUser(saccoUserId: string) {
    try {
      const user = await this.managementClient.getUser({ id: saccoUserId });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const userRole = await this.managementClient.getUserRoles({
        id: saccoUserId,
      });

      const userRoleIds = userRole.map((role) => role.id);

      if (
        userRoleIds.includes(RoleIdType.STATION_MANAGER) ||
        userRoleIds.includes(RoleIdType.DRIVER) ||
        userRoleIds.includes(RoleIdType.SERVICE_AGENT)
      ) {
        await this.managementClient.deleteUser({ id: saccoUserId });
      } else {
        throw new HttpException(
          'User role not eligible for deletion',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { message: 'Admin user deleted successfully' };
    } catch (error) {
      console.error('Error deleting admin:', error.message);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignDriverToVehicle(
    assignDriverToVehicleDto: AssignDriverToVehicleDto,
  ) {
    try {
      const driverMetadata = await this.getUserMetadata(
        assignDriverToVehicleDto.driverId,
      );

      if (driverMetadata.vehicle) {
        throw new HttpException(
          'Vehicle already has a driver assigned',
          HttpStatus.BAD_REQUEST,
        );
      } else if (
        await this.vehicleModel.findOne({
          driver: assignDriverToVehicleDto.driverId,
        })
      ) {
        throw new HttpException(
          'Driver is already assigned to a vehicle',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        await this.managementClient.updateUserMetadata(
          { id: assignDriverToVehicleDto.driverId },
          { vehicle: assignDriverToVehicleDto.vehicleId },
        );
        await this.vehicleModel.findByIdAndUpdate(
          assignDriverToVehicleDto.vehicleId,
          { driver: assignDriverToVehicleDto.driverId },
        );

        return { message: 'Driver assigned to vehicle successfully.' };
      }
    } catch (error) {
      console.error('Error assigning driver to vehicle:', error.message);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * ## Creates a new Auth0 user
   * @param currentUser
   * @param createUserDto
   * @returns Promise<User<AppMetadata, UserMetadata>>;
   * */
  async addUser(currentUser: JwtPayload, createUserDto: CreateSaccoUserDto) {
    const user = await this.managementClient.createUser({
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


    // this.managementClient.updateUserMetadata(
    //   { id: user.user_id },
    //   { sacco: currentUser.user_metadata.sacco },
    // );

    return user;
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

  async getUserMetadata(userId: string) {
    try {
      const user = await this.managementClient.getUser({ id: userId });
      return user.user_metadata;
    } catch (error) {
      console.error('Error retrieving user metadata:', error);
      throw error;
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
