import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { UserFactory } from '../../../factories/mock-data.factory';
import { mockLoggerFactory } from '../../../factories/mock-logger.factory';
import { ShareItem } from '../entities/share-item.entity';
import { ShareItemService } from './share-item.service';

describe('ShareItemService', () => {
  let service: ShareItemService;
  let repository: MongoRepository<ShareItem>;

  const userFactory = new UserFactory();

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

      const userId = new ObjectId();
      const mediaId = mediaItem._id;
      const createdBy = new ObjectId(userFactory.userId);

      const result = await service.createMediaShareItem({ createdBy, mediaId, userId, title: 'blah' });

      expect(result).toHaveProperty('mediaId');
      expect(result.mediaId.toHexString()).toEqual(mediaId.toHexString());
      expect(result.userId.toHexString()).toEqual(userId.toHexString());
      expect(result.createdBy.toHexString()).toEqual(createdBy.toHexString());
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
        title: 'blah',
      });

      expect(result).toBeDefined();

      expect(result).toHaveProperty('createdBy');
      expect(result).toHaveProperty('playlistId');
      expect(result.createdBy.toHexString()).toBe(userFactory.user._id.toHexString());
    });
  });
});
