import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { userDataFactory, UserFactory } from '../../factories/mock-data.factory';
import { mockLoggerFactory } from '../../factories/mock-logger.factory';
import { PlaylistItem } from './entities/playlist-item.entity';
import { PlaylistItemService } from './playlist-item.service';

describe('PlaylistItemService', () => {
  let service: PlaylistItemService;
  let repository: MongoRepository<PlaylistItem>;

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
          entities: [PlaylistItem],
          ssl: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          logging: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(PlaylistItem),
          useClass: MongoRepository,
        },
        { provide: PinoLogger, useValue: mockLoggerFactory() },
      ],
    }).compile();

    repository = getMongoRepository(PlaylistItem);
    await repository.deleteMany({});

    const logger = module.get(PinoLogger);
    service = new PlaylistItemService(repository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPlaylistItemsByUserId', () => {
    it('should find playlistItems by a given userId', async () => {
      const playlistItemDtos = testData.media;

      const inserted = await service.insertMany(playlistItemDtos.map((item) => ({ ...item, userId: userFactory.user._id })));

      /* const result = await service.searchByUserId(userFactory.userId);

      expect(result).toBeDefined();
      expect(result).toHaveLength(inserted.length); */
    });
  });
});
