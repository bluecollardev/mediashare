import { IdType } from '@core-lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataService } from '@api';
import { ObjectIdGuard } from '@util-lib';
import { PinoLogger } from 'nestjs-pino';
import { DeleteWriteOpResultObject, MongoRepository } from 'typeorm';
import { CreateMediaShareItemDto, CreatePlaylistShareItemDto } from './dto/create-share-item.dto';
import { UserConnectionDto } from '@api-modules/user-connection/dto/user-connection.dto';
import { ShareItem } from './entities/share-item.entity';

@Injectable()
export class ShareItemService extends DataService<ShareItem, MongoRepository<ShareItem>> {
  constructor(
    @InjectRepository(ShareItem)
    repository: MongoRepository<ShareItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  async createMediaShareItem({ userId, mediaId, createdBy, title }: CreateMediaShareItemDto): Promise<ShareItem> {
    return await this.create({
      userId: ObjectIdGuard(userId),
      mediaId: ObjectIdGuard(mediaId),
      createdBy: ObjectIdGuard(createdBy),
      title,
      read: false,
    });
  }

  async createPlaylistShareItem({ userId, playlistId, createdBy, title }: CreatePlaylistShareItemDto): Promise<ShareItem> {
    return await this.create({
      userId: ObjectIdGuard(userId),
      playlistId: ObjectIdGuard(playlistId),
      createdBy: ObjectIdGuard(createdBy),
      title,
      read: false,
    });
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
        { $match: { $and: [{ createdBy: ObjectIdGuard(userId) }, { mediaId: { $exists: true } }] } },
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
        { $match: { $and: [{ createdBy: ObjectIdGuard(userId) }, { playlistId: { $exists: true } }] } },
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
            authorProfile: {
              authorId: '$author._id',
              authorName: { $concat: ['$author.firstName', ' ', '$author.lastName'] },
              authorUsername: '$author.username',
              authorImage: '$author.imageSrc',
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  shareId: '$_id',
                  sharedWith: '$sharedWith.username',
                  sharedWithUserId: '$sharedWith._id',
                  sharedBy: '$sharedBy.username',
                  sharedByUserId: '$sharedBy._id',
                  authorProfile: '$authorProfile',
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
        { $match: { $and: [{ userId: ObjectIdGuard(userId) }, { mediaId: { $exists: true } }] } },
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
        { $match: { $and: [{ userId: ObjectIdGuard(userId) }, { playlistId: { $exists: true } }] } },
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
            authorProfile: {
              authorId: '$author._id',
              authorName: { $concat: ['$author.firstName', ' ', '$author.lastName'] },
              authorUsername: '$author.username',
              authorImage: '$author.imageSrc',
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  shareId: '$_id',
                  sharedWith: '$sharedWith.username',
                  sharedWithUserId: '$sharedWith._id',
                  sharedBy: '$sharedBy.username',
                  sharedByUserId: '$sharedBy._id',
                  authorProfile: '$authorProfile',
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

  async removeShareItems(shareItemIds: IdType[]): Promise<DeleteWriteOpResultObject> {
    const shareItemObjectIds = shareItemIds.map((id: string) => ObjectIdGuard(id));
    return await this.repository.deleteMany({
      _id: { $in: shareItemObjectIds }
    });
  }

  async removeUserConnectionShareItems(userConnectionDtos: UserConnectionDto[]): Promise<ShareItem[]> {
    try {
      const shareItemsToRemove = [];
      const removeShareItems = userConnectionDtos.map(async (userConnectionDto) => {
        const { userId, connectionId }: Partial<UserConnectionDto> = userConnectionDto;
        if (!userId || !connectionId) {
          throw new Error('userId and connectionId are both required parameters');
        }

        const query = [{
          $match: {
            $or: [
              {
                $and: [
                  { createdBy: ObjectIdGuard(userId) },
                  { userId: ObjectIdGuard(connectionId) }
                ]
              },
              {
                $and: [
                  { createdBy: ObjectIdGuard(connectionId) },
                  { userId: ObjectIdGuard(userId) }
                ]
              }
            ],
          }
        }];
        const shareItems = await this.repository.aggregate(query).toArray();
        shareItemsToRemove.push(...shareItems);
      });
      await Promise.all(removeShareItems);
      return await this.repository.remove(shareItemsToRemove);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.removeUserConnection ${error}`);
      throw error;
    }
  }
}
