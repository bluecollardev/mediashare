import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  ApiErrorResponse,
  ApiErrorResponses,
} from '@mediashare/core/errors/api-error';
import { MediaShareItemDto, PlaylistShareItemDto } from './dto/share-item.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ObjectIdGuard } from '@mediashare/core/guards';
import { DataService } from '@mediashare/core/services';
import { IdType } from '@mediashare/shared';
import {
  CreateMediaShareItemDto,
  CreatePlaylistShareItemDto,
} from './dto/create-share-item.dto';
import { ShareItem } from './entities/share-item.entity';

@Injectable()
export class ShareItemDataService extends DataService<
  ShareItem,
  MongoRepository<ShareItem>
> {
  constructor(
    @InjectRepository(ShareItem) repository: MongoRepository<ShareItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }
}

@Injectable()
export class ShareItemService {
  constructor(
    public dataService: ShareItemDataService,
    @InjectMapper() private readonly classMapper: Mapper,
    public logger: PinoLogger
  ) {}

  async createMediaShareItem(
    createMediaShareItemDto: CreateMediaShareItemDto
  ): Promise<MediaShareItemDto> {
    const errors = await this.dataService.validateDto(
      CreateMediaShareItemDto,
      createMediaShareItemDto
    );
    if (errors)
      throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = await this.classMapper.mapAsync(
      createMediaShareItemDto,
      CreateMediaShareItemDto,
      ShareItem
    );
    const result = await this.dataService.create(entity);
    return await this.classMapper.mapAsync(
      result,
      ShareItem,
      MediaShareItemDto
    );
  }

  async createPlaylistShareItem(
    createPlaylistShareItemDto: CreatePlaylistShareItemDto
  ): Promise<PlaylistShareItemDto> {
    const errors = await this.dataService.validateDto(
      CreatePlaylistShareItemDto,
      createPlaylistShareItemDto
    );
    if (errors)
      throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = await this.classMapper.mapAsync(
      createPlaylistShareItemDto,
      CreatePlaylistShareItemDto,
      ShareItem
    );
    const result = await this.dataService.create(entity);
    return await this.classMapper.mapAsync(
      result,
      ShareItem,
      PlaylistShareItemDto
    );
  }

  async getItemsSharedByUser(userSub: string) {
    return {
      mediaItems: await this.getMediaItemsSharedByUser(userSub),
      playlists: await this.getPlaylistsSharedByUser(userSub),
    };
  }

  async getMediaItemsSharedByUser(userSub: string) {
    return this.dataService.repository
      .aggregate([
        {
          $match: {
            $and: [{ createdBy: userSub }, { mediaId: { $exists: true } }],
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $lookup: {
            from: 'media_item',
            localField: 'mediaId',
            foreignField: '_id',
            as: 'mediaItem',
          },
        },
        { $unwind: { path: '$author' } },
        { $unwind: { path: '$mediaItem' } },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  userSub: 0,
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

  async getPlaylistsSharedByUser(userSub: string) {
    return this.dataService.repository
      .aggregate([
        {
          $match: {
            $and: [{ createdBy: userSub }, { playlistId: { $exists: true } }],
          },
        },
        {
          $lookup: {
            from: 'playlist',
            localField: 'playlistId',
            foreignField: '_id',
            as: 'playlist',
          },
        },
        {
          $lookup: {
            from: 'media_item',
            localField: 'mediaIds',
            foreignField: '_id',
            as: 'mediaItems',
          },
        },
        // { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'sharedBy' } },
        // { $lookup: { from: 'user', localField: 'userSub', foreignField: '_id', as: 'sharedWith' } },
        // { $lookup: { from: 'user', localField: 'playlist.createdBy', foreignField: '_id', as: 'author' } },
        {
          $lookup: {
            from: 'share_item',
            localField: 'playlist._id',
            foreignField: 'playlistId',
            as: 'shareItems',
          },
        },
        {
          $lookup: {
            from: 'view_item',
            localField: 'playlist._id',
            foreignField: 'playlistId',
            as: 'viewItems',
          },
        },
        {
          $lookup: {
            from: 'like_item',
            localField: 'playlist._id',
            foreignField: 'playlistId',
            as: 'likeItems',
          },
        },
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

  async getItemsSharedWithUser(userSub: string) {
    return {
      mediaItems: await this.getMediaItemsSharedWithUser(userSub),
      playlists: await this.getPlaylistsSharedWithUser(userSub),
    };
  }

  async getMediaItemsSharedWithUser(userSub: string) {
    return this.dataService.repository
      .aggregate([
        { $match: { $and: [{ userSub }, { mediaId: { $exists: true } }] } },
        {
          $lookup: {
            from: 'user',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $lookup: {
            from: 'media_item',
            localField: 'mediaId',
            foreignField: '_id',
            as: 'mediaItem',
          },
        },
        { $unwind: { path: '$author' } },
        { $unwind: { path: '$mediaItem' } },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  userSub: 0,
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

  async getPlaylistsSharedWithUser(userSub: string) {
    return this.dataService.repository
      .aggregate([
        { $match: { $and: [{ userSub }, { playlistId: { $exists: true } }] } },
        {
          $lookup: {
            from: 'playlist',
            localField: 'playlistId',
            foreignField: '_id',
            as: 'playlist',
          },
        },
        {
          $lookup: {
            from: 'media_item',
            localField: 'mediaIds',
            foreignField: '_id',
            as: 'mediaItems',
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'sharedBy',
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'userSub',
            foreignField: '_id',
            as: 'sharedWith',
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'playlist.createdBy',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $lookup: {
            from: 'share_item',
            localField: 'playlist._id',
            foreignField: 'playlistId',
            as: 'shareItems',
          },
        },
        {
          $lookup: {
            from: 'view_item',
            localField: 'playlist._id',
            foreignField: 'playlistId',
            as: 'viewItems',
          },
        },
        {
          $lookup: {
            from: 'like_item',
            localField: 'playlist._id',
            foreignField: 'playlistId',
            as: 'likeItems',
          },
        },
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
    const shareItemObjectIds = shareItemIds.map((id: string) =>
      ObjectIdGuard(id)
    );
    return await this.dataService.repository.deleteMany({
      _id: { $in: shareItemObjectIds },
    });
  }

  /* async removeUserConnectionShareItems(userConnectionDtos: UserConnectionDto[]): Promise<ShareItem[]> {
    try {
      const shareItemsToRemove = [];
      const removeShareItems = userConnectionDtos.map(async (userConnectionDto) => {
        const { userSub, connectionId }: Partial<UserConnectionDto> = userConnectionDto;
        if (!userSub || !connectionId) {
          throw new Error('userSub and connectionId are both required parameters');
        }

        const query = [
          {
            $match: {
              $or: [
                {
                  $and: [{ createdBy: userSub }, { userSub: ObjectIdGuard(connectionId) }],
                },
                {
                  $and: [{ createdBy: ObjectIdGuard(connectionId) }, { userSub }],
                },
              ],
            },
          },
        ];
        const shareItems = await this.dataService.repository.aggregate(query).toArray();
        shareItemsToRemove.push(...shareItems);
      });
      await Promise.all(removeShareItems);
      return await this.dataService.repository.remove(shareItemsToRemove);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.removeUserConnection ${error}`);
      throw error;
    }
  } */
}
