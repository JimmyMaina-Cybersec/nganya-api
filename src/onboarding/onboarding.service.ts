import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { CreateSaccoGeneralAdmin } from './dto/create-sacco-genera-admin.dto';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard.service';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { Sacco, SaccoDocument } from 'src/saccos/schema/sacco.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaccoDto } from 'src/saccos/dto/create-sacco.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { ManagementClient } from 'auth0';
import { RoleIdType } from 'src/types/RoleIdType';


@Injectable()
export class OnboardingService {


  constructor(
    @InjectModel(Sacco.name)
    private saccoModel: Model<SaccoDocument>,
  ) { }


  addSacco(createOnboardingDto: CreateSaccoDto, user: JwtPayload) {
    const sacco = new this.saccoModel(
      {
        ...createOnboardingDto,
        addedBy: user.sub,
      }

    );
    return sacco.save();
  }

  /**
   * 
   * ## Create a general admin
   * @param createOnboardingDto 
   * @returns User`
   * 
   */
  async createGeneralAdmin(generalAdminDTO: CreateSaccoGeneralAdmin) {

    const client_id = 'sy6vl7Klm5UxsoMvKHlBmF4L2dtqTcp3';
    const client_secret = 'CBGF9Ab9iCoaO6pxrVzzxglop6A8JteUI_EBFWr3iIkG0mPDjro8UucWnTqqLHOO';



    const managementClient = new ManagementClient({
      domain: 'nganya.us.auth0.com',
      clientId: client_id,
      clientSecret: client_secret,
      scope: 'create:users',
    });

    try {

      const registerdUser = await managementClient.createUser({
        email: generalAdminDTO.email,
        user_metadata: {
          sacco: generalAdminDTO.sacco,
          station: null,
          vehicle: null,
          role: 'general admin',
          idNo: generalAdminDTO.idNo,
        },
        app_metadata: {},
        given_name: generalAdminDTO.firstName,
        family_name: generalAdminDTO.lastName,
        connection: 'Username-Password-Authentication',
        password: generalAdminDTO.sacco + '@Nganya2023',
      });

      // assign user roles
      await managementClient.assignRolestoUser(
        { id: registerdUser.user_id },
        { roles: [RoleIdType.GENERAL_ADMIN] },
      );


      return registerdUser;

    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message ?? 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }


  }

  findAll() {
    return `This action returns all onboarding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onboarding`;
  }

  update(id: number, updateOnboardingDto: UpdateOnboardingDto) {
    return `This action updates a #${id} onboarding`;
  }

  remove(id: number) {
    return `This action removes a #${id} onboarding`;
  }
}
