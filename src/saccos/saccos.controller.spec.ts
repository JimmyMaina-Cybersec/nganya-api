import { Test, TestingModule } from '@nestjs/testing';
import { SaccosController } from './saccos.controller';
import { SaccosService } from './saccos.service';

describe('SaccosController', () => {
  let controller: SaccosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaccosController],
      providers: [SaccosService],
    }).compile();

    controller = module.get<SaccosController>(SaccosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
