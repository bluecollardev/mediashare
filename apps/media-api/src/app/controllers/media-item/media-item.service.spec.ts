import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { mockLoggerFactory } from '../../factories/mock-logger.factory';
import { MediaItem } from './entities/media-item.entity';
import { MediaItemService } from './media-item.service';

describe('MediaItemService', () => {
  let service: MediaItemService;
  let repository: MongoRepository<MediaItem>;

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
});
