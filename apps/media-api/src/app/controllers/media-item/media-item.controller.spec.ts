import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { MediaItem } from './entities/media-item.entity';
import { MediaItemController } from './media-item.controller';
import { MediaItemService } from './media-item.service';

describe('MediaItemController', () => {
  let controller: MediaItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaItemController],
      providers: [
        MediaItemService,
        {
          provide: MediaItemService,
          useValue: mockDataServiceFactory(new MediaItem()),
        },
      ],
    }).compile();

    controller = module.get<MediaItemController>(MediaItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
