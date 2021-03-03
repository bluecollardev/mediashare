import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { CreateMediaShareItemInput, CreatePlaylistShareItemDto } from '../dto/create-share-item.dto';

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

  findShareItemsByUserId(userId: string) {
    return this.repository.find({ userId: new ObjectId(userId) });
  }

  /**
   * Create a new share media item. This inserts a record into the mongo database in the shape of the share item.
   *
   * @param {CreateMediaShareItemInput} params
   * @return {ShareItem}
   * @memberof ShareItemService
   */
  async createMediaShareItem(params: CreateMediaShareItemInput) {
    const { userId: userIdStr, mediaId: mediaIdStr, createdBy: createdByStr, title } = params;
    const item = await this.create({
      userId: new ObjectId(userIdStr),
      mediaId: new ObjectId(mediaIdStr),
      createdBy: new ObjectId(createdByStr),
      title,
      read: false,
    });

    return item;
  }

  createPlaylistShareItem(params: CreatePlaylistShareItemDto): Promise<ShareItem> {
    const { userId: userIdStr, playlistId: playlistIdStr, createdBy: createdByStr, title } = params;
    return this.create({
      userId: new ObjectId(userIdStr),
      playlistId: new ObjectId(playlistIdStr),
      createdBy: new ObjectId(createdByStr),
      title,
      read: false,
    });
  }
}
