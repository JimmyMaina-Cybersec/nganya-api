import { Module } from '@nestjs/common';
import { VehicleOwnersService } from './vehicle-owners.service';
import { VehicleOwnersController } from './vehicle-owners.controller';

@Module({
  controllers: [VehicleOwnersController],
  providers: [VehicleOwnersService]
})
export class VehicleOwnersModule {}
