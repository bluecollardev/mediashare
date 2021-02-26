import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { userDataFactory, UserFactory } from '../../../factories/mock-data.factory';
import { mockLoggerFactory } from '../../../factories/mock-logger.factory';
import { PlaylistItem } from '../entities/playlist-item.entity';
import { PlaylistItemService } from './playlist-item.service';

describe('PlaylistItemService', () => {
  let service: PlaylistItemService;
  let repository: MongoRepository<PlaylistItem>;

  const userFactory = new UserFactory();

  const testData = userDataFactory(userFactory);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          synchronize: false,
          autoLoadEntities: true,
          type: 'mongodb',
          url: 'mongodb://localhost:27017/',
          host: 'localhost',
          port: 27017,
          database: 'playlistitems',
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
        // UserService,
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

  describe('insertMany', () => {
    it('should insert many playlistItems', async () => {
      const { playlistDto, media } = testData;

      const result = await service.insertMany(playlistDto);

      expect(result).toBeDefined();

      expect(result).toHaveLength(playlistDto.length);
    });
  });
});
