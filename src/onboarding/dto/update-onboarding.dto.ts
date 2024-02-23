import { PartialType } from '@nestjs/mapped-types';
import { CreateSaccoGeneralAdmin } from './create-sacco-genera-admin.dto';

export class UpdateOnboardingDto extends PartialType(CreateSaccoGeneralAdmin) { }
