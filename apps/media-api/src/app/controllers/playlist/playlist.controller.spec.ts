import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { PlaylistItem } from '../../modules/playlist-item/entities/playlist-item.entity';
import { PlaylistItemService } from '../../modules/playlist-item/services/playlist-item.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './services/playlist.service';

describe('PlaylistController', () => {
  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [
        {
          provide: PlaylistService,
          useValue: mockDataServiceFactory(),
        },
        {
          provide: PlaylistItemService,
          useValue: mockDataServiceFactory(),
        },
      ],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
