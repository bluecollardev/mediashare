import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { mockLoggerFactory } from '../../factories/mock-logger.factory';
import { MediaItem } from './entities/media-item.entity';
import { MediaItemService } from './media-item.service';

describe('MediaItemService', () => {
  let service: MediaItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(MediaItem),
          useClass: MongoRepository,
        },
        { provide: PinoLogger, useValue: mockLoggerFactory() },
        MediaItemService,
      ],
    }).compile();

    service = module.get<MediaItemService>(MediaItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
