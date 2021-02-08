import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistDataService } from './playlist-data.service';

describe('PlaylistDataService', () => {
  let service: PlaylistDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistDataService],
    }).compile();

    service = module.get<PlaylistDataService>(PlaylistDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
