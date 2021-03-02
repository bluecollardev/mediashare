import { Test, TestingModule } from '@nestjs/testing';
import {} from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { MediaItemService } from '../media-item/media-item.service';
import { PlaylistService } from '../playlist/services/playlist.service';
import { PlaylistItemService } from '../../modules/playlist-item/services/playlist-item.service';
import { ShareItemService } from '../../modules/share-item/services/share-item.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],

      providers: [
        {
          provide: UserService,
          useValue: mockDataServiceFactory(),
        },
        { provide: MediaItemService, useValue: mockDataServiceFactory() },
        { provide: PlaylistService, useValue: mockDataServiceFactory() },
        { provide: PlaylistItemService, useValue: mockDataServiceFactory() },
        { provide: ShareItemService, useValue: mockDataServiceFactory() },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
