import { Test, TestingModule } from '@nestjs/testing';
import { ShareItemsService } from './share-items.service';

describe('ShareItemsService', () => {
  let service: ShareItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareItemsService],
    }).compile();

    service = module.get<ShareItemsService>(ShareItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
