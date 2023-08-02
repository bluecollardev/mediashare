import { ApiErrorResponse, ApiErrorResponses } from '@mediashare/core/errors/api-error';
import { PinoLogger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ConfigService } from '@nestjs/config';
import { MongoRepository } from 'typeorm';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { MongoFindOneOptions } from 'typeorm/find-options/mongodb/MongoFindOneOptions';

import { ObjectIdGuard } from '@mediashare/core/guards';
import { IdType } from '@mediashare/shared';
import { SearchParameters } from '@mediashare/shared';
import { FilterableDataService } from '@mediashare/core/services';

import { PlaylistItem } from './entities/playlist-item.entity';
import { CreatePlaylistItemDto } from './dto/create-playlist-item.dto';
import { UpdatePlaylistItemDto } from './dto/update-playlist-item.dto';
import { PlaylistItemDto } from './dto/playlist-item.dto';

import { VISIBILITY_PUBLIC, VISIBILITY_SUBSCRIPTION } from '../../core/models';

@Injectable()
export class PlaylistItemDataService extends FilterableDataService<PlaylistItem, MongoRepository<PlaylistItem>> {
  constructor(
    @InjectRepository(PlaylistItem) repository: MongoRepository<PlaylistItem>,
    logger: PinoLogger,
    private configService: ConfigService
  ) {
    super(repository, logger);
    this.repository
      // TODO: Support weights and upgrade MongoDB, for now we're just going to remove description as we can't weight the results...
      // .createCollectionIndex({ title: 'text', description: 'text' })
      .createCollectionIndex({ title: 'text' })
      .then((indexName) => {
        this.collectionIndexName = indexName;
      });
  }

  protected buildAggregateQuery(params: SearchParameters) {
    const {
      userId,
      query,
      fullText = false,
      // textMatchingMode = 'and',
      tags,
      // TODO: Complete support for tagsMatchingMode (it's not exposed via controller)
      tagsMatchingMode = 'all', // all | any // TODO: Type this!
    }: SearchParameters = params;

    let aggregateQuery = [];

    // We have to search by text first as $match->$text is only allowed to be the first part of an aggregate query
    // TODO: fullText means a search on all index fields, this is only supported in MongoDB Atlas
    // Not sure if we want to use Atlas as we can't self host... we can implement distributed search later...
    if (query && fullText) {
      // IMPORTANT! This shouldn't run at any time (fullText = false is hardcoded)
      throw new Error('Elastic search has not been implemented');
    } else if (query && !fullText) {
      if (this.useDistributedSearch) {
        throw new Error('Elastic search has not been implemented');
      }
    }

    // Match by user ID if it's available as it's indexed and this is the best way to reduce the number of results early
    if (userId) {
      aggregateQuery = aggregateQuery.concat([
        {
          $match: query
            ? {
              $text: { $search: query },
              $and: [{ createdBy: ObjectIdGuard(userId) }],
            }
            : {
              $and: [{ createdBy: ObjectIdGuard(userId) }],
            },
        },
      ]);
    } else {
      // Only return search results that are app subscriber content (for paying app subscribers), shared content from a user's network, or public content
      const appSubscriberContentUserIds = this.configService.get('appSubscriberContentUserIds');
      aggregateQuery = aggregateQuery.concat([
        {
          $match: query
            ? {
              $text: { $search: query },
              $and: [
                { $or: [...appSubscriberContentUserIds.map((id) => ({ createdBy: ObjectIdGuard(id) }))] },
                { visibility: { $in: [VISIBILITY_PUBLIC, VISIBILITY_SUBSCRIPTION] } },
              ],
            }
            : {
              $and: [
                { $or: [...appSubscriberContentUserIds.map((id) => ({ createdBy: ObjectIdGuard(id) }))] },
                { visibility: { $in: [VISIBILITY_PUBLIC, VISIBILITY_SUBSCRIPTION] } },
              ],
            },
        },
      ]);
    }

    // Tags are not indexed as they're nested in the documents, so do this last!
    if (tags) {
      aggregateQuery = aggregateQuery.concat([
        {
          $addFields: {
            matchedTags: '$tags.key',
          },
        },
      ]);

      if (tagsMatchingMode === 'any') {
        aggregateQuery.push({
          $match: {
            // TODO: User tags?
            // createdBy: userId,
            matchedTags: { $in: tags },
          },
        });
      } else if (tagsMatchingMode === 'all') {
        aggregateQuery.push({
          $match: {
            // TODO: User tags?
            // createdBy: userId,
            matchedTags: { $all: tags },
          },
        });
      }
    }

    return aggregateQuery;
  }

  protected buildFields() {
    return [
      { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'author' } },
      // { $lookup: { from: 'share_item', localField: '_id', foreignField: 'playlistItemId', as: 'shareItems' } },
      // { $lookup: { from: 'view_item', localField: '_id', foreignField: 'playlistItemId', as: 'viewItems' } },
      // { $lookup: { from: 'like_item', localField: '_id', foreignField: 'playlistItemId', as: 'likeItems' } },
      { $unwind: { path: '$author' } },
      {
        $addFields: {
          /* authorProfile: {
            authorId: '$author._id',
            authorName: { $concat: ['$author.firstName', ' ', '$author.lastName'] },
            authorUsername: '$author.username',
            authorImage: '$author.imageSrc',
          }, */
        },
      },
    ];
  }

  protected replaceRoot(): object {
    return {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              _id: '$_id',
              playlistId: '$playlistId',
              mediaId: '$mediaId',
              userId: '$author._id',
              username: '$author.username',
              author: '$author',
              // authorProfile: '$authorProfile',
              title: '$title',
              description: '$description',
              sortIndex: '$sortIndex',
              uri: '$uri',
              imageSrc: '$imageSrc',
              // visibility: '$visibility',
              tags: '$tags',
              // shareCount: { $size: '$shareItems' },
              // likesCount: { $size: '$likeItems' },
              // viewCount: { $size: '$viewItems' },
              // viewCount: { $size: '$viewItems' },
              createdBy: '$author._id',
              createdAt: '$createdAt',
              updatedDate: '$updatedDate',
            },
          ],
        },
      },
    };
  }
}

@Injectable()
export class PlaylistItemService {
  constructor(
    public dataService: PlaylistItemDataService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async create(createPlaylistItemDto: CreatePlaylistItemDto): Promise<PlaylistItemDto> {
    const errors = await this.dataService.validateDto(CreatePlaylistItemDto, createPlaylistItemDto);
    if (errors) throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = await this.classMapper.mapAsync(createPlaylistItemDto, CreatePlaylistItemDto, PlaylistItem);
    const result = await this.dataService.create(entity);
    return await this.classMapper.mapAsync(result, PlaylistItem, PlaylistItemDto);
  }

  async update(playlistItemId: IdType, updatePlaylistItemDto: UpdatePlaylistItemDto): Promise<PlaylistItemDto> {
    const errors = await this.dataService.validateDto(UpdatePlaylistItemDto, updatePlaylistItemDto);
    if (errors) throw new ApiErrorResponse(ApiErrorResponses.ValidationError(errors));
    const entity = await this.classMapper.mapAsync(updatePlaylistItemDto, UpdatePlaylistItemDto, PlaylistItem);
    const result = await this.dataService.update(playlistItemId, entity);
    return await this.classMapper.mapAsync(result, PlaylistItem, PlaylistItemDto);
  }

  async remove(id: IdType) {
    return await this.dataService.remove(id);
  }

  async getById(id: IdType) {
    return await this.dataService.getById(id);
  }

  async findOne(id: IdType) {
    const entity = await this.dataService.findOne(id);
    return await this.classMapper.mapAsync(entity, PlaylistItem, PlaylistItemDto);
  }

  async findByQuery(query: MongoFindOneOptions<PlaylistItem>) {
    return await this.dataService.findByQuery(query);
  }

  async findAllByQuery(query: MongoFindManyOptions<PlaylistItem>) {
    return await this.dataService.findAllByQuery(query);
  }
}
