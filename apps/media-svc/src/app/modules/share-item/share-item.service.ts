import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoFindOneOptions } from 'typeorm/find-options/mongodb/MongoFindOneOptions';
import { ObjectIdGuard } from '@mediashare/core/guards';
import { DataService } from '@mediashare/core/services';
import { IdType } from '@mediashare/shared';
import { CreateMediaShareItemDto, CreatePlaylistShareItemDto } from './dto/create-share-item.dto';
// import { UserConnectionDto } from '../user-connection/dto/user-connection.dto';
import { ShareItem } from './entities/share-item.entity';

@Injectable()
export class ShareItemDataService extends DataService<ShareItem, MongoRepository<ShareItem>> {
  constructor(
    @InjectRepository(ShareItem) repository: MongoRepository<ShareItem>,
    logger: PinoLogger,
  ) {
    super(repository, logger);
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

  async createMediaShareItem({ userId, mediaId, createdBy }: CreateMediaShareItemDto): Promise<ShareItem> {
    return await this.create({
      userId,
      mediaId: ObjectIdGuard(mediaId),
      createdBy,
      read: false,
    } as any);
  }

  async createPlaylistShareItem({ userId, playlistId, createdBy }: CreatePlaylistShareItemDto): Promise<ShareItem> {
    return await this.create({
      userId,
      playlistId: ObjectIdGuard(playlistId),
      createdBy,
      read: false,
    } as any);
  }

  async getItemsSharedByUser(userId: IdType) {
    return {
      mediaItems: await this.getMediaItemsSharedByUser(userId),
      playlists: await this.getPlaylistsSharedByUser(userId),
    };
  }

  async getMediaItemsSharedByUser(userId: IdType) {
    return this.repository
      .aggregate([
        { $match: { $and: [{ createdBy: userId }, { mediaId: { $exists: true } }] } },
        { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'author' } },
        { $lookup: { from: 'media_item', localField: 'mediaId', foreignField: '_id', as: 'mediaItem' } },
        { $unwind: { path: '$author' } },
        { $unwind: { path: '$mediaItem' } },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  userId: 0,
                  playlistId: 0,
                  mediaId: 0,
                },
                '$mediaItem',
                {
                  createdBy: '$author',
                },
              ],
            },
          },
        },
      ])
      .toArray();
  }

  async getPlaylistsSharedByUser(userId: IdType) {
    return this.repository
      .aggregate([
        { $match: { $and: [{ createdBy: userId }, { playlistId: { $exists: true } }] } },
        { $lookup: { from: 'playlist', localField: 'playlistId', foreignField: '_id', as: 'playlist' } },
        { $lookup: { from: 'media_item', localField: 'mediaIds', foreignField: '_id', as: 'mediaItems' } },
        // { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'sharedBy' } },
        // { $lookup: { from: 'user', localField: 'userId', foreignField: '_id', as: 'sharedWith' } },
        // { $lookup: { from: 'user', localField: 'playlist.createdBy', foreignField: '_id', as: 'author' } },
        { $lookup: { from: 'share_item', localField: 'playlist._id', foreignField: 'playlistId', as: 'shareItems' } },
        { $lookup: { from: 'view_item', localField: 'playlist._id', foreignField: 'playlistId', as: 'viewItems' } },
        { $lookup: { from: 'like_item', localField: 'playlist._id', foreignField: 'playlistId', as: 'likeItems' } },
        { $unwind: '$playlist' },
        // { $unwind: '$sharedBy' },
        // { $unwind: '$sharedWith' },
        {
          $addFields: {
            tags: '$playlist.tags',
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  playlistId: '$playlistId',
                  shareId: '$_id',
                  sharedWith: '$sharedWith.username',
                  sharedWithUserId: '$sharedWith._id',
                  sharedBy: '$sharedBy.username',
                  sharedByUserId: '$sharedBy._id',
                  // authorProfile: '$authorProfile',
                  read: '$read',
                  tags: '$tags',
                  shareCount: { $size: '$shareItems' },
                  likesCount: { $size: '$likeItems' },
                  viewCount: { $size: '$viewItems' },
                  createdAt: '$createdAt',
                },
                '$playlist',
              ],
            },
          },
        },
      ])
      .toArray();
  }

  async getItemsSharedWithUser(userId: IdType) {
    return {
      mediaItems: await this.getMediaItemsSharedWithUser(userId),
      playlists: await this.getPlaylistsSharedWithUser(userId),
    };
  }

  async getMediaItemsSharedWithUser(userId: IdType) {
    return this.repository
      .aggregate([
        { $match: { $and: [{ userId }, { mediaId: { $exists: true } }] } },
        { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'author' } },
        { $lookup: { from: 'media_item', localField: 'mediaId', foreignField: '_id', as: 'mediaItem' } },
        { $unwind: { path: '$author' } },
        { $unwind: { path: '$mediaItem' } },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  userId: 0,
                  playlistId: 0,
                  mediaId: 0,
                },
                '$mediaItem',
                {
                  createdBy: '$author',
                },
              ],
            },
          },
        },
      ])
      .toArray();
  }

  async getPlaylistsSharedWithUser(userId: IdType) {
    return this.repository
      .aggregate([
        { $match: { $and: [{ userId }, { playlistId: { $exists: true } }] } },
        { $lookup: { from: 'playlist', localField: 'playlistId', foreignField: '_id', as: 'playlist' } },
        { $lookup: { from: 'media_item', localField: 'mediaIds', foreignField: '_id', as: 'mediaItems' } },
        { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'sharedBy' } },
        { $lookup: { from: 'user', localField: 'userId', foreignField: '_id', as: 'sharedWith' } },
        { $lookup: { from: 'user', localField: 'playlist.createdBy', foreignField: '_id', as: 'author' } },
        { $lookup: { from: 'share_item', localField: 'playlist._id', foreignField: 'playlistId', as: 'shareItems' } },
        { $lookup: { from: 'view_item', localField: 'playlist._id', foreignField: 'playlistId', as: 'viewItems' } },
        { $lookup: { from: 'like_item', localField: 'playlist._id', foreignField: 'playlistId', as: 'likeItems' } },
        { $unwind: '$playlist' },
        { $unwind: '$sharedBy' },
        { $unwind: '$sharedWith' },
        { $unwind: '$author' },
        {
          $addFields: {
            tags: '$playlist.tags',
            /* authorProfile: {
              authorId: '$author._id',
              authorName: { $concat: ['$author.firstName', ' ', '$author.lastName'] },
              authorUsername: '$author.username',
              authorImage: '$author.imageSrc',
            } */
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  playlistId: '$playlistId',
                  shareId: '$_id',
                  sharedWith: '$sharedWith.username',
                  sharedWithUserId: '$sharedWith._id',
                  sharedBy: '$sharedBy.username',
                  sharedByUserId: '$sharedBy._id',
                  // authorProfile: '$authorProfile',
                  read: '$read',
                  tags: '$tags',
                  shareCount: { $size: '$shareItems' },
                  likesCount: { $size: '$likeItems' },
                  viewCount: { $size: '$viewItems' },
                  createdAt: '$createdAt',
                },
                '$playlist',
              ],
            },
          },
        },
      ])
      .toArray();
  }

  // Was previously Promise<DeleteWriteOpResultObject>
  async removeShareItems(shareItemIds: IdType[]): Promise<any> {
    const shareItemObjectIds = shareItemIds.map((id: string) => ObjectIdGuard(id));
    return await this.repository.deleteMany({
      _id: { $in: shareItemObjectIds },
    });
  }

  /* async removeUserConnectionShareItems(userConnectionDtos: UserConnectionDto[]): Promise<ShareItem[]> {
    try {
      const shareItemsToRemove = [];
      const removeShareItems = userConnectionDtos.map(async (userConnectionDto) => {
        const { userId, connectionId }: Partial<UserConnectionDto> = userConnectionDto;
        if (!userId || !connectionId) {
          throw new Error('userId and connectionId are both required parameters');
        }

        const query = [
          {
            $match: {
              $or: [
                {
                  $and: [{ createdBy: userId }, { userId: ObjectIdGuard(connectionId) }],
                },
                {
                  $and: [{ createdBy: ObjectIdGuard(connectionId) }, { userId }],
                },
              ],
            },
          },
        ];
        const shareItems = await this.repository.aggregate(query).toArray();
        shareItemsToRemove.push(...shareItems);
      });
      await Promise.all(removeShareItems);
      return await this.repository.remove(shareItemsToRemove);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.removeUserConnection ${error}`);
      throw error;
    }
  } */
}
