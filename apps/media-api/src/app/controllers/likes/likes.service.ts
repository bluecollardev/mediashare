import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { DataService } from '../../core';
import { ViewItem } from '../views/entities/view-item.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
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
