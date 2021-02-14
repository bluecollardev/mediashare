import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { PlaylistItem } from './entities/playlist-item.entity';
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
          useValue: mockDataServiceFactory(new PlaylistItem()),
        },
      ],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
