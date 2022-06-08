import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { UserFactory } from '../../factories/mock-data.factory';
import { MediaItem } from './entities/media-item.entity';
import { MediaItemController } from './media-item.controller';
import { MediaItemService } from './media-item.service';
import { reveal, stub } from 'jest-auto-stub';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { ObjectId } from 'mongodb';
import { ShareItemService } from '@api-modules/share-item/share-item.service';

describe('MediaItemController', () => {
  let controller: MediaItemController;

  const mockShareItemService = stub<ShareItemService>();
  const mockMediaService = stub<MediaItemService>();
  const response = stub<Response>();

  const userFactory = new UserFactory();

  const createMediaItemDto = () => userFactory.createMediaDto();
  const createMediaItem = (dto?: CreateMediaItemDto) => new MediaItem(dto || createMediaItemDto());

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaItemController],
      providers: [
        MediaItemService,
        {
          provide: MediaItemService,
          useValue: mockMediaService,
        },
        { provide: ShareItemService, useValue: mockShareItemService },
      ],
    }).compile();

    controller = module.get<MediaItemController>(MediaItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new media item', async () => {
      const mediaItemDto = createMediaItemDto();

      const expected = new MediaItem(mediaItemDto);

      reveal(mockMediaService).create.mockReturnValueOnce(new Promise((resolve) => resolve(expected)));

      const createdBy = new ObjectId();
      const mediaItemResponse = await controller.create(mediaItemDto, createdBy); //, userFactory.createSessionUser());

      expect(mediaItemResponse).toBeDefined();
      expect(mediaItemResponse).toEqual(expected);
    });

    it('should reject a new media item without a title prop', async () => {
      const mediaItemDto = createMediaItemDto();

      delete mediaItemDto.summary;

      const expected = new MediaItem(mediaItemDto);
      const sessionUser = userFactory.createSessionUser();

      reveal(mockMediaService).create.mockReturnValueOnce(new Promise((resolve) => resolve(expected)));

      const createdBy = new ObjectId();
      const mediaItemResponse = await controller.create(mediaItemDto, createdBy); //, sessionUser);

      expect(mediaItemResponse).toBeDefined();
      expect(mediaItemResponse).toEqual(expected);
    });
  });
  describe('findOne', () => {
    it('should find a media item by Id', async () => {
      const id = new ObjectId();

      const expected = createMediaItem();
      expected._id = id;

      reveal(mockMediaService).findOne.mockReturnValueOnce(new Promise((resolve) => resolve(expected)));

      const mediaItemResponse = null; // await controller.findOne(id.toHexString());

      expect(mockMediaService.findOne).toBeCalled();
      expect(mockMediaService.findOne).toBeCalledWith(id.toHexString());
      expect(mediaItemResponse).toBeDefined();

      expect(mediaItemResponse._id).toEqual(id);
    });

    it('should throw errw when item not found', async () => {
      const id = new ObjectId();

      reveal(mockMediaService).findOne.mockReturnValue(null);

      // expect(controller.findOne(id.toHexString())).rejects.toThrow();
    });
    it('should throw when not a string', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const id = new ObjectId() as any;

      expect(controller.findOne(id)).rejects.toThrow();
    });
  });
  describe('update', () => {
    it('should update an item by id', async () => {
      const id = new ObjectId();

      const updateDto = createMediaItemDto();

      reveal(mockMediaService).update.mockReturnValue(new Promise((resolve) => resolve(updateDto)));

      const updateResult = null; // await controller.update(id.toHexString(), updateDto);

      expect(updateResult).toBeDefined();

      expect(updateResult).toBe(updateDto);
    });
  });
  describe('remove', () => {
    it('should remove an existing item', async () => {
      const id = new ObjectId();

      reveal(mockMediaService).remove.mockReturnValue(new Promise((resolve) => resolve({ raw: 'abcdef' })));

      const deleted = await mockMediaService.remove(id.toHexString());

      expect(deleted).toBeDefined();
    });
  });

  describe('share', () => {
    it('should create a new share item', async () => {
      const userId = new ObjectId();
      const mediaId = new ObjectId();
      const createdBy = new ObjectId();

      reveal(mockMediaService).findOne.mockReturnValueOnce(new Promise((resolve) => resolve({ userId: userId } as any)));
      const resultMock = { _id: new ObjectId(), userId, mediaId, read: false, createdBy, title: 'sometime' };

      reveal(mockShareItemService).createMediaShareItem.mockReturnValueOnce(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new Promise((resolve) => resolve(resultMock))
      );

      const response = stub<Response>();
      reveal(response).send.mockReturnValueOnce(resultMock as any);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await controller.share(mediaId.toHexString(), userId.toHexString(), response);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('mediaId');
    });
  });
});
