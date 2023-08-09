import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { AvailabilitiesService } from './availabilities.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Station, StationDocument } from 'src/stations/schema/station.schema';
import { Vehicle, VehicleDocument } from 'src/vehicles/schema/vehicle.schema';
import {
  Availability,
  AvailabilityDocument,
} from './schema/availability.schema';
import { Server } from 'socket.io';

// @UseGuards(AuthGuard('jwt'))
@WebSocketGateway({ namespace: 'availabilities' })
export class AvailabilitiesGateway {
  constructor(
    private readonly availabilitiesService: AvailabilitiesService,

    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<AvailabilityDocument>,
    @InjectModel(Station.name)
    private readonly stationModel: Model<StationDocument>,
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
  ) { }

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Namespace: ' + socket.nsp.name);
      console.log('Socket ID: ' + socket.id);
    });
  }

  @SubscribeMessage('stationAvailabilities')
  async handleMessage(@MessageBody() stationId: string, availability: any) {
    this.server.to(stationId).emit('onStationAvailabilities', availability);
  }
}
