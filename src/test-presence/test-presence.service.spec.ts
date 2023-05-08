import { Test, TestingModule } from '@nestjs/testing';
import { TestPresenceService } from './test-presence.service';

describe('TestPresenceService', () => {
  let service: TestPresenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestPresenceService],
    }).compile();

    service = module.get<TestPresenceService>(TestPresenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
