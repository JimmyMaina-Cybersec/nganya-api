import { Test, TestingModule } from '@nestjs/testing';
import { TestPresenceGateway } from './test-presence.gateway';
import { TestPresenceService } from './test-presence.service';

describe('TestPresenceGateway', () => {
  let gateway: TestPresenceGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestPresenceGateway, TestPresenceService],
    }).compile();

    gateway = module.get<TestPresenceGateway>(TestPresenceGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
