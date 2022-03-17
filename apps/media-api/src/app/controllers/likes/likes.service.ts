import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataService } from '@api';
import { ViewItem } from '../views/entities/view-item.entity';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService extends DataService<Like, MongoRepository<Like>> {
  constructor(
    @InjectRepository(Like)
    repository: MongoRepository<ViewItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }
}
