import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { ShareItemsController } from './share-items.controller';

describe('ShareItemsController', () => {
  let controller: ShareItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareItemsController],
      providers: [
        {
          provide: ShareItemService,
          useValue: mockDataServiceFactory(),
        },
      ],
    }).compile();

    controller = module.get(ShareItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
