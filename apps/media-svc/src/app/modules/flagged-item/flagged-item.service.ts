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
              _id: '$_id',
              playlistId: '$playlistId',
              mediaId: '$mediaId',
              flaggedBy: '$flaggedBy.username',
              flaggedByUserId: '$flaggedBy.sub',
              ...this.buildAuthorReplaceRootDetails(),
              count: '$count',
              createdAt: '$createdAt',
            },
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
      ])
      .toArray();
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
            as: 'flaggedBy',
          },
        },
        ...this.dataService.buildAuthorFields(),
        { $unwind: '$flaggedBy' },
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
}
