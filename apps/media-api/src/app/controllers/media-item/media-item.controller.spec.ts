import { Test, TestingModule } from '@nestjs/testing';
import { MediaItemController } from './media-item.controller';
import { MediaItemService } from './media-item.service';

describe('MediaItemController', () => {
  let controller: MediaItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaItemController],
      providers: [MediaItemService],
    }).compile();

    controller = module.get<MediaItemController>(MediaItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
