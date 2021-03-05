import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { UserFactory } from '../../../factories/mock-data.factory';
import { mockLoggerFactory } from '../../../factories/mock-logger.factory';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { User } from '../../user/entities/user.entity';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistService } from './playlist.service';

import * as R from 'remeda';
import { ObjectId } from 'mongodb';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let repository: MongoRepository<Playlist>;
  let mediaRepository: MongoRepository<MediaItem>;
  const userFactory = new UserFactory();
  const user = new User(userFactory.createUserDto());

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          synchronize: true,
          autoLoadEntities: true,
          type: 'mongodb',
          url: 'mongodb://localhost:27017/',
          host: 'localhost',
          port: 27017,
          database: 'test',
          entities: [Playlist, PlaylistItem, MediaItem],
          ssl: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          logging: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(Playlist),
          useClass: MongoRepository,
        },
        {
          provide: getRepositoryToken(MediaItem),
          useValue: mediaRepository,
        },
        { provide: PinoLogger, useValue: mockLoggerFactory() },
      ],
    }).compile();

    mediaRepository = getMongoRepository(MediaItem);
    repository = getMongoRepository(Playlist);

    await repository.deleteMany({});

    const logger = module.get(PinoLogger);
    service = new PlaylistService(repository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPlaylist', () => {
    it("should create a new playlist item with no media Id's", async () => {
      const userId = userFactory.user._id;

      const items = [userFactory.createMediaDto(), userFactory.createMediaDto()];
      console.log(items);
      const media = await mediaRepository.insertMany(items);
      const mediaIds = [media.insertedIds['0'].toHexString(), media.insertedIds['1'].toHexString()];
      const inserted = await service.createPlaylist(userId, {
        mediaIds,
      });
      console.log(userId);

      expect(inserted).toBeDefined();
      expect(inserted.userId.toHexString()).toBe(userId.toHexString());
      expect(inserted).toHaveProperty('items');
      expect(inserted.items).toHaveLength(items.length);
    });

    it("should create a new playlist item with media Id's", async () => {
      const mediaIds = R.pipe(
        R.range(0, 5),
        R.map(() => new ObjectId().toHexString())
      );

      const result = await service.createPlaylist(user._id, { mediaIds });

      expect(result).toBeDefined();
      expect(result.items).toHaveLength(5);
      expect(result.items[0].mediaId.toHexString()).toEqual(mediaIds[0]);
    });

    it('should create a new playlist item with a title', async () => {
      const title = 'Test Media Item';

      const result = await service.createPlaylist(user._id, { title });

      expect(result).toBeDefined();
      expect(result.title).toEqual(title);
      expect(result.items).toHaveLength(0);
    });
  });
});
