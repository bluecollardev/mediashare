import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { TagService } from '../../modules/tag/services/tag.service';
import { TagController } from './tag.controller';
ß
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
