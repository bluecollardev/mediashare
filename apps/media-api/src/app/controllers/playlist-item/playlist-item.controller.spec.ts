import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistItemController } from './playlist-item.controller';
import { PlaylistItemService } from './playlist-item.service';

describe('PlaylistItemController', () => {
  let controller: PlaylistItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistItemController],
      providers: [PlaylistItemService],
    }).compile();

    controller = module.get<PlaylistItemController>(PlaylistItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
