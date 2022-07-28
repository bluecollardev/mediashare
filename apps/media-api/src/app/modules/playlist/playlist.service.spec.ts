/* import { UserService } from '@api-modules/auth/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { UserFactory } from '../../../factories/mock-data.factory';
import { mockLoggerFactory } from '../../../factories/mock-logger.factory';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from '../entities/playlist.entity'; */
import { PlaylistService } from './playlist.service';
/* import { PlaylistItemService } from '@api-modules/playlist-item/services/playlist-item.service'; */

describe('PlaylistService', () => {
  /* let service: SearchService;
  let repository: MongoRepository<Playlist>;
  let mediaRepository: MongoRepository<MediaItem>;
  let playlistItemRepository: MongoRepository<PlaylistItem>;

  const userFactory = new UserFactory();

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
        { provide: getRepositoryToken(PlaylistItem), useValue: playlistItemRepository },
        { provide: PinoLogger, useValue: mockLoggerFactory() },
      ],
    }).compile();

    mediaRepository = getMongoRepository(MediaItem);
    repository = getMongoRepository(Playlist);
    playlistItemRepository = getMongoRepository(PlaylistItem);
    await repository.deleteMany({});

    const logger = module.get(PinoLogger);
    const playlistItemService = new PlaylistItemService(playlistItemRepository, logger);
    service = new SearchService(repository, logger, userService, playlistItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPlaylist', () => {
    it("should create a new playlist item with no media Id's", async () => {
      const userId = userFactory.user._id;

      const dto = [userFactory.createMediaDto(), userFactory.createMediaDto()];
      const media = await mediaRepository.insertMany(dto);
      const mediaIds = [media.insertedIds['0'].toHexString(), media.insertedIds['1'].toHexString()];
      const inserted = await service.createPlaylistWithItems({ userId, mediaIds });

      expect(inserted).toBeDefined();

      expect(inserted).toHaveProperty('title');
      expect(inserted.playlistItems).toHaveLength(dto.length);

      const {
        playlistItems,
        playlist: { _id: playlistId },
      } = inserted;

      const aggregated = await service.getById({ playlistId });
      expect(aggregated).toHaveLength(playlistItems.length);
    });
  });

  describe('findByUserId', () => {
    it('should get a user', async () => {
      const userId = userFactory.user._id;

      const dto = [userFactory.createMediaDto(), userFactory.createMediaDto()];
      const media = await mediaRepository.insertMany(dto);
      const mediaIds = [media.insertedIds['0'].toHexString(), media.insertedIds['1'].toHexString()];
      const items = await service.createPlaylistWithItems({ userId, mediaIds });
      console.log(userId);

      const findAll = await service.findByUserId(userId.toHexString());
    });
  }); */
});
