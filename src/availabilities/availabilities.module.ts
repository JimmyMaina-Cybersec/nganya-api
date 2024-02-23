import { Module } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { AvailabilitiesController } from './availabilities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Availability, AvailabilitySchema } from './schema/availability.schema';
import { AvailabilitiesGateway } from './availabilty.gateway';

@Module({
  controllers: [AvailabilitiesController],
  imports: [
    MongooseModule.forFeature([
      { name: Availability.name, schema: AvailabilitySchema },
    ]),
  ],
  providers: [AvailabilitiesService, AvailabilitiesGateway],
})
export class AvailabilitiesModule {}
