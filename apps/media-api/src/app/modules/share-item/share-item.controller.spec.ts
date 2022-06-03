import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { ShareItemController } from './share-item.controller';

describe('ShareItemsController', () => {
  let controller: ShareItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareItemController],
      providers: [
        {
          provide: ShareItemService,
          useValue: mockDataServiceFactory(),
        },
      ],
    }).compile();

    controller = module.get(ShareItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
