import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sacco, SaccoSchema } from 'src/saccos/schema/sacco.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';

@Module({
  controllers: [OnboardingController],
  imports: [
    MongooseModule.forFeature([
      { name: Sacco.name, schema: SaccoSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [OnboardingService]
})
export class OnboardingModule { }
