import { Test, TestingModule } from '@nestjs/testing';
import { PlayListItemController } from './play-list-item.controller';
import { PlayListItemService } from './play-list-item.service';

describe('PlayListItemController', () => {
  let controller: PlayListItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayListItemController],
      providers: [PlayListItemService],
    }).compile();

    controller = module.get<PlayListItemController>(PlayListItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
