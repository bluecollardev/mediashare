import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DataService } from '@api';
import { PinoLogger } from 'nestjs-pino';
import { ViewItem } from './entities/view-item.entity';

@Injectable()
export class ViewsService extends DataService<ViewItem, MongoRepository<ViewItem>> {
  constructor(
    @InjectRepository(ViewItem)
    repository: MongoRepository<ViewItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }
}
