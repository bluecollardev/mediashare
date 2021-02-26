import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { userDataFactory, UserFactory } from '../../../factories/mock-data.factory';
import { mockLoggerFactory } from '../../../factories/mock-logger.factory';
import { ShareItem } from '../entities/share-item.entity';
import { ShareItemService } from './share-item.service';

describe('PlaylistItemService', () => {
  let service: ShareItemService;
  let repository: MongoRepository<ShareItem>;

  const userFactory = new UserFactory();

  const testData = userDataFactory(userFactory);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          synchronize: false,
          autoLoadEntities: false,
          type: 'mongodb',
          url: 'mongodb://localhost:27017/',
          host: 'localhost',
          port: 27017,
          database: 'test',
          entities: [ShareItem],
          ssl: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          logging: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(ShareItem),
          useClass: MongoRepository,
        },
        { provide: PinoLogger, useValue: mockLoggerFactory() },
      ],
    }).compile();

    repository = getMongoRepository(ShareItem);
    await repository.deleteMany({});

    const logger = module.get(PinoLogger);
    service = new ShareItemService(repository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMediaShareItem', () => {
    it('should insert a media share item', async () => {
      const mediaItem = userFactory.createMediaItem();

      const userId = new ObjectId().toHexString();
      const mediaId = mediaItem._id.toHexString();
      const createdBy = userFactory.userId;

      const result = await service.createMediaShareItem({ createdBy, mediaId, userId });

      expect(result).toHaveProperty('mediaId');
      expect(result.mediaId.toHexString()).toBe(mediaId);
      expect(result.userId.toHexString()).toBe(userId);
      expect(result.createdBy.toHexString()).toBe(createdBy);
    });
  });
  describe('createPlaylistShareItem', () => {
    it('should insert a playlist share item', async () => {
      const playlist = userFactory.createPlaylist();

      const userId = new ObjectId().toHexString();

      const result = await service.createPlaylistShareItem({
        createdBy: userFactory.userId,
        playlistId: playlist._id.toHexString(),
        userId,
      });

      expect(result).toBeDefined();

      expect(result).toHaveProperty('createdBy');
      expect(result).toHaveProperty('playlistId');
      expect(result.createdBy.toHexString()).toBe(userFactory.user._id.toHexString());
    });
  });
});
