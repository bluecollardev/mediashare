import { Test, TestingModule } from '@nestjs/testing';
import { MediaDataService } from './media-data.service';

describe('MediaDataService', () => {
  let service: MediaDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaDataService],
    }).compile();

    service = module.get<MediaDataService>(MediaDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
