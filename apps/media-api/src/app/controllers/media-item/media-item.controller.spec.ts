import { Test, TestingModule } from '@nestjs/testing';
import { UserFactory } from '../../factories/mock-data.factory';
import { User } from '../user/entities/user.entity';
import { MediaItem } from './entities/media-item.entity';
import { MediaItemController } from './media-item.controller';
import { MediaItemService } from './media-item.service';
import { reveal, stub } from 'jest-auto-stub';
import { CreateMediaItemDto } from './dto/create-media-item.dto';
import { ObjectId } from 'mongodb';

describe('MediaItemController', () => {
  let controller: MediaItemController;
  const userFactory = new UserFactory();
  const user = new User(userFactory.createUserDto());
  const createMediaItemDto = () => userFactory.createMediaDto(user._id);
  const createMediaItem = (dto?: CreateMediaItemDto) => new MediaItem(dto || createMediaItemDto());

  const mockMediaService = stub<MediaItemService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaItemController],
      providers: [
        MediaItemService,
        {
          provide: MediaItemService,
          useValue: mockMediaService,
        },
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

      const mediaItemResponse = await controller.create(mediaItemDto);

      expect(mediaItemResponse).toBeDefined();
      expect(mediaItemResponse).toEqual(expected);
    });

    it('should reject a new media item without a title prop', async () => {
      const mediaItemDto = createMediaItemDto();

      delete mediaItemDto.summary;

      const expected = new MediaItem(mediaItemDto);

      reveal(mockMediaService).create.mockReturnValueOnce(new Promise((resolve) => resolve(expected)));

      const mediaItemResponse = await controller.create(mediaItemDto);

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

      const mediaItemResponse = await controller.findOne(id.toHexString());

      expect(mockMediaService.findOne).toBeCalled();
      expect(mockMediaService.findOne).toBeCalledWith(id.toHexString());
      expect(mediaItemResponse).toBeDefined();

      expect(mediaItemResponse._id).toEqual(id);
    });

    it('should throw errw when item not found', async () => {
      const id = new ObjectId();

      reveal(mockMediaService).findOne.mockReturnValue(null);

      expect(controller.findOne(id.toHexString())).rejects.toThrow();
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

      const updateResult = await controller.update(id.toHexString(), updateDto);

      expect(updateResult).toBeDefined();

      expect(updateResult).toBe(updateDto);
    });
  });
  describe('remove', () => {
    it('should remove an existing item', async () => {
      const id = new ObjectId();

      reveal(mockMediaService).remove.mockReturnValue(
        new Promise((resolve) => resolve({ raw: 'abcdef', generatedMaps: [] }))
      );

      const deleted = await mockMediaService.remove(id.toHexString());

      expect(deleted).toBeDefined();
    });
  });
});
