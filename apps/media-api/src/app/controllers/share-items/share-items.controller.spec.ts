import { Test, TestingModule } from '@nestjs/testing';
import { ShareItemsController } from './share-items.controller';

describe('ShareItemsController', () => {
  let controller: ShareItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareItemsController],
      providers: [],
    }).compile();

    controller = module.get<ShareItemsController>(ShareItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
