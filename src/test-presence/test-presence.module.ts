import { Module } from '@nestjs/common';
import { TestPresenceService } from './test-presence.service';
import { TestPresenceGateway } from './test-presence.gateway';

@Module({
  providers: [TestPresenceGateway, TestPresenceService]
})
export class TestPresenceModule {}
