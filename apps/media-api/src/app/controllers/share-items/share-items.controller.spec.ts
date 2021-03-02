import { Test, TestingModule } from '@nestjs/testing';
import { ShareItemsController } from './share-items.controller';
import { ShareItemsService } from './share-items.service';

describe('ShareItemsController', () => {
  let controller: ShareItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareItemsController],
      providers: [ShareItemsService],
    }).compile();

    controller = module.get<ShareItemsController>(ShareItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
