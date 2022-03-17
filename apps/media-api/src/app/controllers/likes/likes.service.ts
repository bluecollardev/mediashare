import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataService } from '@api-core/models/data-provider.model';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService extends DataService<Like, MongoRepository<Like>> {
  constructor(
    @InjectRepository(Like)
    repository: MongoRepository<Like>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }
}
