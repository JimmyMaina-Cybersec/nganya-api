import { Test, TestingModule } from '@nestjs/testing';
import { BookingGateway } from './booking.gateway';
import { BookingService } from './booking.service';

describe('BookingGateway', () => {
  let gateway: BookingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingGateway, BookingService],
    }).compile();

    gateway = module.get<BookingGateway>(BookingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
