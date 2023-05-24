import { Test, TestingModule } from '@nestjs/testing';
import { WellKnownController } from './well-known.controller';

describe('WellKnownController', () => {
  let controller: WellKnownController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WellKnownController],
    }).compile();

    controller = module.get(WellKnownController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
