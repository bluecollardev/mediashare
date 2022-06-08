import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { Tag } from '@api-core/entities/tag.entity';
// import { UserFactory } from '../../factories/mock-data.factory';
import { mockLoggerFactory } from '../../factories/mock-logger.factory';
import { TagService } from './tag.service';

describe('ShareItemService', () => {
  let service: TagService;
  let repository: MongoRepository<Tag>;

  // const userFactory = new UserFactory();

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
          entities: [Tag],
          ssl: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          logging: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(Tag),
          useClass: MongoRepository,
        },
        { provide: PinoLogger, useValue: mockLoggerFactory() },
      ],
    }).compile();

    repository = getMongoRepository(Tag);
    await repository.deleteMany({});

    const logger = module.get(PinoLogger);
    service = new TagService(repository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
