import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { mockLoggerFactory } from '../../factories/mock-logger.factory';
import { PlaylistItem } from './entities/playlist-item.entity';
import { PlaylistItemService } from './playlist-item.service';

describe('PlaylistItemService', () => {
  let service: PlaylistItemService;
  let repository: MongoRepository<PlaylistItem>;

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
});
