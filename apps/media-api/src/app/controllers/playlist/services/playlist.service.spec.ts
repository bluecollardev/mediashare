import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { mockLoggerFactory } from '../../../factories/mock-logger.factory';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistService } from './playlist.service';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let repository: MongoRepository<Playlist>;

  beforeAll(async () => {
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
          entities: [Playlist, PlaylistItem],
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
        { provide: PinoLogger, useValue: mockLoggerFactory() },
      ],
    }).compile();

    repository = getMongoRepository(Playlist);

    await repository.deleteMany({});

    const logger = module.get(PinoLogger);
    service = new PlaylistService(repository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
