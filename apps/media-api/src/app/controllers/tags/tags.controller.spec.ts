import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { TagService } from '@api-modules/tag/tag.service';
import { TagsController } from './tags.controller';

describe('TagController', () => {
  let controller: TagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [
        {
          provide: TagService,
          useValue: mockDataServiceFactory(),
        },
      ],
    }).compile();

    controller = module.get(TagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
