import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { CreateMediaShareItemDto, CreatePlaylistShareItemDto } from '../dto/create-share-item.dto';

import { ShareItem } from '../entities/share-item.entity';

@Injectable()
export class ShareItemService extends DataService<ShareItem, MongoRepository<ShareItem>> {
  constructor(
    @InjectRepository(ShareItem)
    repository: MongoRepository<ShareItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  async createMediaShareItem(params: CreateMediaShareItemDto) {
    const { userId: userIdStr, mediaId: mediaIdStr, createdBy: createdByStr, ...rest } = params;
    return this.create({
      ...rest,
      userId: new ObjectId(userIdStr),
      mediaId: new ObjectId(mediaIdStr),
      createdBy: new ObjectId(createdByStr),
      read: false,
    });
  }

  async createPlaylistShareItem(params: CreatePlaylistShareItemDto) {
    const { userId: userIdStr, playlistId: playlistIdStr, createdBy: createdByStr, ...rest } = params;
    return this.create({
      ...rest,
      userId: new ObjectId(userIdStr),
      playlistId: new ObjectId(playlistIdStr),
      createdBy: new ObjectId(createdByStr),
      read: false,
    });
  }
}
