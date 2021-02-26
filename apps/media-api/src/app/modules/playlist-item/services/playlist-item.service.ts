import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { PlaylistItem } from '../entities/playlist-item.entity';

@Injectable()
export class PlaylistItemService extends DataService<PlaylistItem, MongoRepository<PlaylistItem>> {
  constructor(
    @InjectRepository(PlaylistItem)
    repository: MongoRepository<PlaylistItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }
}
