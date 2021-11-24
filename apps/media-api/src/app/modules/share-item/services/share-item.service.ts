import { DataService } from '@api';
import { ObjectIdParameters, OptionalObjectIdParameters } from '@mediashare/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { CreateMediashareItemInput, CreatePlaylistShareItemDto } from '../dto/create-share-item.dto';

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

  findShareItemsByUserId(userId: ObjectId) {
    return [this.aggregateSharedMediaItems({ userId }), this.aggregateSharedPlaylists({ userId })];
  }

  aggregateSharedPlaylistItems({ userId }: { userId: ObjectId }) {
    const query = this.repository.aggregate([
      {
        $match: { where: { userId, playlistId: { $exists: true } } },
      },
      {
        $lookup: { from: 'playlist_item', localField: 'playlistId', foreignField: 'playlistId', as: 'playlistItems' },
      },
    ]);
    return query.toArray();
  }

  aggregateSharedMediaItems({ userId }: { userId: ObjectId }) {
    const query = this.repository.aggregate([
      { $match: { $and: [{ userId: userId }, { mediaId: { $exists: true } }] } },

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

  aggregateSharesMediaItems({ createdBy }: { createdBy: ObjectId }) {
    const query = this.repository.aggregate([
      { $match: { $and: [{ createdBy: createdBy }, { mediaId: { $exists: true } }] } },

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

  aggregateSharedPlaylists({ userId }: OptionalObjectIdParameters) {
    return this.repository
      .aggregate([
        { $match: { $and: [{ userId: userId }, { playlistId: { $exists: true } }] } },
        { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'shareItemAuthor' } },
        { $lookup: { from: 'user', localField: 'userId', foreignField: '_id', as: 'shareItemRecipient' } },

        {
          $lookup: {
            from: 'playlist',
            localField: 'playlistId',
            foreignField: '_id',
            as: 'playlist',
          },
        },
        { $lookup: { from: 'user', localField: 'playlist.createdBy', foreignField: '_id', as: 'playlistAuthor' } },
        { $unwind: '$playlist' },
        { $unwind: '$shareItemAuthor' },
        { $unwind: '$shareItemRecipient' },
        { $unwind: '$playlistAuthor' },

        { $lookup: { from: 'media_item', localField: 'mediaIds', foreignField: '_id', as: 'mediaItems' } },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  shareId: '$_id',
                  sharedTo: '$shareItemRecipient.username',
                  sharedToUserId: '$shareItemRecipient._id',
                  sharedBy: '$shareItemAuthor.username',
                  sharedByUserId: '$shareItemAuthor._id',
                  playlistAuthor: '$playlistAuthor.username',
                  playlistAuthorId: '$playlistAuthor._id',
                  read: '$read',
                  createdAt: '$createdAt',
                },
                '$playlist',
              ],
            },
          },
        },

        { $lookup: { from: 'media_item', localField: 'mediaIds', foreignField: '_id', as: 'mediaItems' } },
      ])
      .toArray();
  }
  aggregateSharesPlaylists({ createdBy }: OptionalObjectIdParameters) {
    return this.repository
      .aggregate([
        { $match: { $and: [{ createdBy: createdBy }, { playlistId: { $exists: true } }] } },
        { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'shareItemAuthor' } },
        { $lookup: { from: 'user', localField: 'userId', foreignField: '_id', as: 'shareItemRecipient' } },

        {
          $lookup: {
            from: 'playlist',
            localField: 'playlistId',
            foreignField: '_id',
            as: 'playlist',
          },
        },
        { $lookup: { from: 'user', localField: 'playlist.createdBy', foreignField: '_id', as: 'playlistAuthor' } },
        { $unwind: '$playlist' },
        { $unwind: '$shareItemAuthor' },
        { $unwind: '$shareItemRecipient' },
        { $unwind: '$playlistAuthor' },

        { $lookup: { from: 'media_item', localField: 'mediaIds', foreignField: '_id', as: 'mediaItems' } },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  shareId: '$_id',
                  sharedTo: '$shareItemRecipient.username',
                  sharedToUserId: '$shareItemRecipient._id',
                  sharedBy: '$shareItemAuthor.username',
                  sharedByUserId: '$shareItemAuthor._id',
                  playlistAuthor: '$playlistAuthor.username',
                  playlistAuthorId: '$playlistAuthor._id',
                  read: '$read',
                  createdAt: '$createdAt',
                },
                '$playlist',
              ],
            },
          },
        },

        { $lookup: { from: 'media_item', localField: 'mediaIds', foreignField: '_id', as: 'mediaItems' } },
      ])
      .toArray();
  }

  getCreatedByUser(userId: ObjectId) {
    return this.repository
      .aggregate([
        {
          $lookup: {
            from: 'user',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        { $unwind: { path: '$createdBy' } },
      ])
      .toArray();
  }

  /**
   * Create a new share media item. This inserts a record into the mongo database in the shape of the share item.
   *
   * @param {CreateMediashareItemInput} params
   * @return {ShareItem}
   * @memberof ShareItemService
   */
  async createMediashareItem(params: CreateMediashareItemInput) {
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
