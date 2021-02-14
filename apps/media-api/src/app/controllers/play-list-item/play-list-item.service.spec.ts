import { Test, TestingModule } from '@nestjs/testing';
import { PlayListItemService } from './play-list-item.service';

describe('PlayListItemService', () => {
  let service: PlayListItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayListItemService],
    }).compile();

    service = module.get<PlayListItemService>(PlayListItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
