import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { AvailabilitiesService } from './availabilities.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';

// @UseGuards(JwtGuard)
@WebSocketGateway({ namespace: 'availabilities' })
export class AvailabilitiesGateway {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  @SubscribeMessage('station availabilities')
  handleMessage(@MessageBody() stationId: string) {
    return this.availabilitiesService.listenStationAvailabilities(stationId);
  }
}
