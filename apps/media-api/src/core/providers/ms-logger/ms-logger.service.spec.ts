import { Test, TestingModule } from '@nestjs/testing';
import { MsLoggerService } from './ms-logger.service';

describe('MsLoggerService', () => {
  let service: MsLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsLoggerService],
    }).compile();

    service = module.get<MsLoggerService>(MsLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
