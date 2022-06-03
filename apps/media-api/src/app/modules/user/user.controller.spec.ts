import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { mockDataServiceFactory } from '../../factories/mock-data-service.factory';
import { MediaItemService } from '../media-item/media-item.service';
import { PlaylistService } from '../playlist/playlist.service';
import { PlaylistItemService } from '@api-modules/playlist-item/playlist-item.service';
import { ShareItemService } from '@api-modules/share-item/share-item.service';
import { UserService } from '@api-modules/user/user.service';

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

    controller = module.get(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
