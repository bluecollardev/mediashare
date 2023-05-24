import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { mockLoggerFactory } from '../../factories/mock-logger.factory';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let repository: MongoRepository<Profile>;

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
          entities: [Profile],
          ssl: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          logging: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(Profile),
          useClass: MongoRepository,
        },
        { provide: PinoLogger, useValue: mockLoggerFactory() },
      ],
    }).compile();

    repository = getMongoRepository(Profile);

    await repository.deleteMany({});

    const logger = module.get(PinoLogger);
    service = new ProfileService(repository, logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
