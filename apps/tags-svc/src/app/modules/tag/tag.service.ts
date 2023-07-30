import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { DataService } from '@mediashare/core/services/data-provider.service';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService extends DataService<Tag, MongoRepository<Tag>> {
  constructor(
    @InjectRepository(Tag)
    repository: MongoRepository<Tag>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }
}
