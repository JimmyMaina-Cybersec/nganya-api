import { Module } from '@nestjs/common';
import { VehicleOwnersService } from './vehicle-owners.service';
import { VehicleOwnersController } from './vehicle-owners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VehicleOwner,
  VehicleOwnerSchema,
} from './schema/vehicle-owner.schema';

@Module({
  controllers: [VehicleOwnersController],
  imports: [
    MongooseModule.forFeature([
      {
        name: VehicleOwner.name,
        schema: VehicleOwnerSchema,
      },
    ]),
  ],
  providers: [VehicleOwnersService],
})
export class VehicleOwnersModule {}
