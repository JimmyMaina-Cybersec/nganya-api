import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateSaccoGeneralAdmin } from './dto/create-sacco-genera-admin.dto';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
import { AuthorizationGuard } from 'src/auth/guards/authorization-guard.service';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { CreateSaccoDto } from 'src/saccos/dto/create-sacco.dto';

@UseGuards(AuthorizationGuard, PermissionsGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) { }


  @SetMetadata('permissions', ['create:saccos'])
  @Post('add-sacco')
  create(@Body() createOnboardingDto: CreateSaccoDto, @CurrentUser() user: JwtPayload) {
    return this.onboardingService.addSacco(createOnboardingDto, user);
  }

  @SetMetadata('permissions', ['create:saccos'])
  @Post('add-general-admin')
  createGeneralAdmin(@Body() createOnboardingDto: CreateSaccoGeneralAdmin) {
    return this.onboardingService.createGeneralAdmin(createOnboardingDto);
  }

  @Get()
  findAll() {
    return this.onboardingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onboardingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnboardingDto: UpdateOnboardingDto) {
    return this.onboardingService.update(+id, updateOnboardingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onboardingService.remove(+id);
  }
}
