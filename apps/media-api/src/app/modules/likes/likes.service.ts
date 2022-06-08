import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { DataService } from '@api';
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
