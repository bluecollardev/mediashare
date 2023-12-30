import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  ApiErrorResponse,
  ApiErrorResponses,
} from '@mediashare/core/errors/api-error';
import {
  MediaFlaggedItemDto,
  PlaylistFlaggedItemDto,
} from './dto/flagged-item.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ObjectIdGuard } from '@mediashare/core/guards';
import { DataService } from '@mediashare/core/services';
import { IdType } from '@mediashare/shared';
import {
  CreateMediaFlaggedItemDto,
  CreatePlaylistFlaggedItemDto,
} from './dto/create-flagged-item.dto';
import { FlaggedItem } from './entities/flagged-item.entity';

@Injectable()
export class FlaggedItemDataService extends DataService<
  FlaggedItem,
  MongoRepository<FlaggedItem>
> {
  constructor(
    @InjectRepository(FlaggedItem) repository: MongoRepository<FlaggedItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  public replaceRoot(): object {
    return {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              playlistId: '$playlistId',
              shareId: '$_id',
              sharedWith: '$sharedWith.username',
              sharedWithUserId: '$sharedWith.sub',
              sharedBy: '$sharedBy.username',
              sharedByUserId: '$sharedBy.sub',
              ...this.buildAuthorReplaceRootDetails(),
              read: '$read',
              /* tags: '$tags',
              shareCount: { $size: '$flaggedItems' },
              likesCount: { $size: '$likeItems' },
              viewCount: { $size: '$viewItems' }, */
              createdAt: '$createdAt',
            },
            '$playlist',
          ],
        },
      },
    };
  }
}

@Injectable()
export class FlaggedItemService {
  constructor(
    public dataService: FlaggedItemDataService,
    @InjectMapper() private readonly classMapper: Mapper,
    public logger: PinoLogger
  ) {}

  async createMediaFlaggedItem(
    createMediaFlaggedItemDto: CreateMediaFlaggedItemDto
  ): Promise<MediaFlaggedItemDto> {
    const errors = await this.dataService.validateDto(
      CreateMediaFlaggedItemDto,
      createMediaFlaggedItemDto
    );
    if (errors)
      throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = await this.classMapper.mapAsync(
      createMediaFlaggedItemDto,
      CreateMediaFlaggedItemDto,
      FlaggedItem
    );
    const result = await this.dataService.create(entity);
    return await this.classMapper.mapAsync(
      result,
      FlaggedItem,
      MediaFlaggedItemDto
    );
  }

  async createPlaylistFlaggedItem(
    createPlaylistFlaggedItemDto: CreatePlaylistFlaggedItemDto
  ): Promise<PlaylistFlaggedItemDto> {
    const errors = await this.dataService.validateDto(
      CreatePlaylistFlaggedItemDto,
      createPlaylistFlaggedItemDto
    );
    if (errors)
      throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = await this.classMapper.mapAsync(
      createPlaylistFlaggedItemDto,
      CreatePlaylistFlaggedItemDto,
      FlaggedItem
    );
    const result = await this.dataService.create(entity);
    return await this.classMapper.mapAsync(
      result,
      FlaggedItem,
      PlaylistFlaggedItemDto
    );
  }

  async getItemsFlaggedByUser(userSub: string) {
    return {
      mediaItems: await this.getMediaItemsFlaggedByUser(userSub),
      playlists: await this.getPlaylistsFlaggedByUser(userSub),
    };
  }

  async getMediaItemsFlaggedByUser(userSub: string) {
    return this.dataService.repository
      .aggregate([
        {
          $match: {
            $and: [{ createdBy: userSub }, { mediaId: { $exists: true } }],
          },
        },
        ...this.dataService.buildAuthorFields(),
        /* {
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
        }, */
      ])
      .toArray();
  }

  private buildStatsLookupFields() {
    return [
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
    ];
  }

  async getPlaylistsFlaggedByUser(userSub: string) {
    const result = await this.dataService.repository
      .aggregate([
        {
          $match: {
            $and: [{ createdBy: userSub }, { playlistId: { $exists: true } }],
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'createdBy',
            foreignField: 'sub',
            as: 'sharedBy',
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'userSub',
            foreignField: 'sub',
            as: 'sharedWith',
          },
        },
        ...this.dataService.buildAuthorFields(),
        {
          $lookup: {
            from: 'playlist',
            localField: 'playlistId',
            foreignField: '_id',
            as: 'playlist',
          },
        },
        /*{
          $lookup: {
            from: 'media_item',
            localField: 'mediaIds',
            foreignField: '_id',
            as: 'mediaItems',
          },
        },*/

        /* {
          $lookup: {
            from: 'share_item',
            localField: 'playlist._id',
            foreignField: 'playlistId',
            as: 'flaggedItems',
          },
        },*/
        ...this.buildStatsLookupFields(),
        { $unwind: '$playlist' },
        { $unwind: '$sharedBy' },
        { $unwind: '$sharedWith' },
        /* {
          $addFields: {
            tags: '$playlist.tags',
          },
        },*/
        { ...this.dataService.replaceRoot() },
      ])
      .toArray();

    return result;
  }

  async getItemsFlaggedWithUser(userSub: string) {
    return {
      mediaItems: await this.getMediaItemsFlaggedWithUser(userSub),
      playlists: await this.getPlaylistsFlaggedWithUser(userSub),
    };
  }

  async getMediaItemsFlaggedWithUser(userSub: string) {
    return this.dataService.repository
      .aggregate([
        { $match: { $and: [{ userSub }, { mediaId: { $exists: true } }] } },
        ...this.dataService.buildAuthorFields(),
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

  async getPlaylistsFlaggedWithUser(userSub: string) {
    const result = await this.dataService.repository
      .aggregate([
        { $match: { $and: [{ userSub }, { playlistId: { $exists: true } }] } },
        {
          $lookup: {
            from: 'user',
            localField: 'createdBy',
            foreignField: 'sub',
            as: 'sharedBy',
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'userSub',
            foreignField: 'sub',
            as: 'sharedWith',
          },
        },
        ...this.dataService.buildAuthorFields(),
        {
          $lookup: {
            from: 'playlist',
            localField: 'playlistId',
            foreignField: '_id',
            as: 'playlist',
          },
        },
        /*{
          $lookup: {
            from: 'media_item',
            localField: 'mediaIds',
            foreignField: '_id',
            as: 'mediaItems',
          },
        },
        {
          $lookup: {
            from: 'share_item',
            localField: 'playlist._id',
            foreignField: 'playlistId',
            as: 'flaggedItems',
          },
        },*/
        ...this.buildStatsLookupFields(),
        { $unwind: '$playlist' },
        { $unwind: '$sharedBy' },
        { $unwind: '$sharedWith' },
        /*{
          $addFields: {
            tags: '$playlist.tags',
            authorProfile: {
              authorId: '$author._id',
              authorName: {
                $concat: ['$author.firstName', ' ', '$author.lastName'],
              },
              authorUsername: '$author.username',
              authorImage: '$author.imageSrc',
            },
          },
        },*/
        { ...this.dataService.replaceRoot() },
      ])
      .toArray();
    return result;
  }

  // Was previously Promise<DeleteWriteOpResultObject>
  async removeFlaggedItems(flaggedItemIds: IdType[]): Promise<any> {
    const flaggedItemObjectIds = flaggedItemIds.map((id: string) =>
      ObjectIdGuard(id)
    );
    return await this.dataService.repository.deleteMany({
      _id: { $in: flaggedItemObjectIds },
    });
  }

  /* async removeUserConnectionFlaggedItems(userConnectionDtos: UserConnectionDto[]): Promise<FlaggedItem[]> {
    try {
      const flaggedItemsToRemove = [];
      const removeFlaggedItems = userConnectionDtos.map(async (userConnectionDto) => {
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
        const flaggedItems = await this.dataService.repository.aggregate(query).toArray();
        flaggedItemsToRemove.push(...flaggedItems);
      });
      await Promise.all(removeFlaggedItems);
      return await this.dataService.repository.remove(flaggedItemsToRemove);
    } catch (error) {
      this.logger.error(`${this.constructor.name}.removeUserConnection ${error}`);
      throw error;
    }
  } */
}
