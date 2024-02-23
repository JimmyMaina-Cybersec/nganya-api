import { TestingModule } from '@nestjs/testing/testing-module';
import { AvailabilitiesController } from './availabilities.controller';
import { AvailabilitiesService } from './availabilities.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { Test } from '@nestjs/testing/test';
import { getModelToken } from '@nestjs/mongoose';
import { Availability } from './schema/availability.schema';

describe('AvailabilitiesController', () => {
  let controller: AvailabilitiesController;
  let service: AvailabilitiesService;

  const mockAvailabilityModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilitiesController],
      providers: [
        AvailabilitiesService,
        {
          provide: getModelToken(Availability.name),
          useValue: mockAvailabilityModel,
        },
      ],
    }).compile();

    controller = module.get<AvailabilitiesController>(AvailabilitiesController);
    service = module.get<AvailabilitiesService>(AvailabilitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an availability', async () => {
      const createAvailabilityDto: CreateAvailabilityDto = {
        route: ['Route1', 'Route2'],
        stationsServiced: ['Station1', 'Station2'],
        vehicle: 'Sample vehicle id',
        plateNo: 'Sample plate number',
        depatureTime: new Date(),
        arrivalTime: new Date(),
      };
      const user: JwtPayload = {
        user_metadata: {
          sacco: 'SampleSacco',
          station: 'SampleStation',
          vehicle: 'SampleVehicle',
          idNo: 'SampleId',
          role: 'SampleRole',
        },
        user_roles: ['Role1', 'Role2'],
        permissions: ['Permission1', 'Permission2'],
        sub: 'Sample sub',
      };

      const result = {
        ...createAvailabilityDto,
        station: user.user_metadata.station,
        sacco: user.user_metadata.sacco,
        addedBy: user.sub,
        addedOn: new Date(),
        status: 'Available',
      };

      mockAvailabilityModel.create.mockRejectedValue(result);

      expect(await controller.create(createAvailabilityDto, user)).toBe(result);
    });
  });

  // Add similar test cases for other controller methods

  afterAll(async () => {
    // Cleanup resources if necessary
  });
});
