import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { TestPresenceService } from './test-presence.service';
import { CreateTestPresenceDto } from './dto/create-test-presence.dto';
import { UpdateTestPresenceDto } from './dto/update-test-presence.dto';

@WebSocketGateway()
export class TestPresenceGateway {
  constructor(private readonly testPresenceService: TestPresenceService) {}

  @SubscribeMessage('createTestPresence')
  create(@MessageBody() createTestPresenceDto: CreateTestPresenceDto) {
    return this.testPresenceService.create(createTestPresenceDto);
  }

  @SubscribeMessage('findAllTestPresence')
  findAll() {
    return this.testPresenceService.findAll();
  }

  @SubscribeMessage('findOneTestPresence')
  findOne(@MessageBody() id: number) {
    return this.testPresenceService.findOne(id);
  }

  @SubscribeMessage('updateTestPresence')
  update(@MessageBody() updateTestPresenceDto: UpdateTestPresenceDto) {
    return this.testPresenceService.update(updateTestPresenceDto.id, updateTestPresenceDto);
  }

  @SubscribeMessage('removeTestPresence')
  remove(@MessageBody() id: number) {
    return this.testPresenceService.remove(id);
  }
}
