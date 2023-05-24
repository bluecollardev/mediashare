import { Test, TestingModule } from '@nestjs/testing';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

describe('PlaylistController', () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: mockDataServiceFactory(),
        },
        {
          provide: ShareItemService,
          useValue: mockDataServiceFactory(),
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
