import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { PlaylistItem } from '../entities/playlist-item.entity';

import * as R from 'remeda';
@Injectable()
export class PlaylistItemService extends DataService<PlaylistItem, MongoRepository<PlaylistItem>> {
  constructor(
    @InjectRepository(PlaylistItem)
    repository: MongoRepository<PlaylistItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  async findByUserId(userIdStr: string) {
    const userId = new ObjectId(userIdStr);

    const playlistItems = await this.repository.find({ userId });

    return playlistItems;
  }
}
