import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

describe('TagController', () => {
  let controller: TagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockDataServiceFactory(),
        },
      ],
    }).compile();

    controller = module.get(TagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
