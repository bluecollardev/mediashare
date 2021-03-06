import { DataService } from '@api';
import { ObjectIdParameters, OptionalObjectIdParameters } from '@mediashare/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { PLAYLIST_TOKEN } from '../../../controllers/playlist/entities/playlist.entity';
import { CreateMediaShareItemInput, CreatePlaylistShareItemDto } from '../dto/create-share-item.dto';

import { ShareItem } from '../entities/share-item.entity';

export class QueryBuilder {
  match({ userId }: OptionalObjectIdParameters) {
    return { $match: { $and: [{ userId }, { mediaId: { $exists: true } }] } };
  }
}

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

  aggregateSharedPlaylistItems({ userId }: { userId: ObjectId }) {
    const query = this.repository.aggregate([
      {
        $match: { where: { userId, playlistId: { $exists: true } } },
      },
      {
        $lookup: { from: PLAYLIST_TOKEN, localField: 'playlistId', foreignField: 'playlistId', as: 'playlistItems' },
      },
    ]);
    return query.toArray();
  }

  aggregateSharedMediaItems({ userId }: { userId: ObjectId }) {
    const query = this.repository.aggregate([
      { $match: { $and: [{ userId }, { mediaId: { $exists: true } }] } },

      { $lookup: { from: 'media_item', localField: 'mediaId', foreignField: '_id', as: 'mediaItem' } },

      { $unwind: { path: '$mediaItem' } },

      {
        $lookup: {
          from: 'user',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      { $unwind: { path: '$createdBy' } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ userId: 0, playlistId: 0, mediaId: 0 }, '$mediaItem', { createdBy: '$createdBy' }],
          },
        },
      },
    ]);

    return query.toArray();
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

  createPlaylistShareItem({ userId, playlistId, createdBy }: CreatePlaylistShareItemDto): Promise<ShareItem> {
    return this.create({
      userId,
      playlistId,
      createdBy,
      read: false,
    });
  }
}
