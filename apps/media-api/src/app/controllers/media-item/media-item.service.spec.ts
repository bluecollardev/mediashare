import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { userDataFactory, UserFactory } from '../../factories/mock-data.factory';
import { mockLoggerFactory } from '../../factories/mock-logger.factory';
import { MediaItem } from './entities/media-item.entity';
import { MediaItemService } from './media-item.service';

describe('MediaItemService', () => {
  let service: MediaItemService;
  let repository: MongoRepository<MediaItem>;

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
          entities: [MediaItem],
          ssl: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          logging: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(MediaItem),
          useClass: MongoRepository,
        },
        { provide: PinoLogger, useValue: mockLoggerFactory() },
      ],
    }).compile();

    repository = getMongoRepository(MediaItem);
    await repository.deleteMany({});

    const logger = module.get(PinoLogger);
    service = new MediaItemService(repository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMediaItemsByUserId', () => {
    it('should find mediaItems by a given userId', async () => {
      const mediaItemDtos = testData.media;

      const inserted = await service.insertMany(mediaItemDtos.map((item) => ({ ...item, userId: userFactory.user._id })));

      /* const result = await service.searchByUserId(userFactory.userId);

      expect(result).toBeDefined();
      expect(result).toHaveLength(inserted.length); */
    });
  });
});
