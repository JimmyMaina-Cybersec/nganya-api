import { Test, TestingModule } from '@nestjs/testing';
import { SaccosService } from './saccos.service';

describe('SaccosService', () => {
  let service: SaccosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaccosService],
    }).compile();

    service = module.get<SaccosService>(SaccosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
