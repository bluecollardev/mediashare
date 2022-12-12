import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectIdGuard } from '@util-lib';
import { IdType } from '@core-lib';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { FilterableDataService } from '@api';
import { UserService } from '@api-modules/user/user.service';
import { PlaylistItemService } from '@api-modules/playlist-item/playlist-item.service';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { SearchParameters } from '@mediashare/shared';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';

type CreatePlaylistParameters = {
  playlistId: ObjectId;
  items: string[];
  createdBy: ObjectId;
};

@Injectable()
export class PlaylistService extends FilterableDataService<Playlist, MongoRepository<Playlist>> {
  constructor(
    @InjectRepository(Playlist)
    repository: MongoRepository<Playlist>,
    logger: PinoLogger,
    private configService: ConfigService,
    private userService: UserService,
    private playlistItemService: PlaylistItemService
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

  async createPlaylistWithItems(dto: CreatePlaylistDto & { createdBy: ObjectId }) {
    const { title, category, description, imageSrc, mediaIds, tags, createdBy, cloneOf } = dto;
    return await this.create({
      title,
      category,
      description,
      imageSrc,
      tags,
      createdBy: ObjectIdGuard(createdBy),
      mediaIds: mediaIds.map((id) => new ObjectId(id)),
      cloneOf,
    });
  }

  async updatePlaylistWithItems(playlistId: IdType, dto: UpdatePlaylistDto) {
    const { mediaIds, ...rest } = dto;
    // TODO: Transaction!
    // Get playlist items by playlistId
    const playlistItems = await this.playlistItemService.findAllByQuery({ playlistId: ObjectIdGuard(playlistId) } as any);
    // Filter out any deleted media items
    const playlistItemIdsToDelete = playlistItems
      // If playlist item mediaId is NOT included in our mediaIds, delete the playlist item
      .filter((item: PlaylistItem) => !mediaIds.includes(item.mediaId.toString()))
      .map((item: PlaylistItem) => item._id.toString());

    // Ensure unique ids
    const uniquePlaylistItemIdsToDelete = Array.from(new Set(playlistItemIdsToDelete));
    const deletePlaylistItems = uniquePlaylistItemIdsToDelete.map(async (playlistItemId) => await this.playlistItemService.remove(playlistItemId));

    const result = await Promise.all(deletePlaylistItems);
    if (!result) {
      // Handle error
    }

    return await this.update(playlistId, {
      ...rest,
      mediaIds: mediaIds.length > 0 ? mediaIds.map((id) => ObjectIdGuard(id)) : [],
    });
  }

  async removePlaylistWithItems(playlistId: IdType) {
    // Get playlist items by playlistId
    const playlistItems = await this.playlistItemService.findAllByQuery({ playlistId: ObjectIdGuard(playlistId) } as any);
    const playlistItemIdsToDelete = playlistItems.map((item: PlaylistItem) => item._id.toString());
    const deletePlaylistItems = playlistItemIdsToDelete.map(async (playlistItemId) => await this.playlistItemService.remove(playlistItemId));

    const result = await Promise.all(deletePlaylistItems);
    if (!result) {
      // Handle error
    }

    return await this.remove(playlistId);
  }

  /* private async createPlaylistItems({ playlistId, items, createdBy }: CreatePlaylistParameters) {
    if (!playlistId || typeof playlistId === 'string') throw new Error('wrong type in createPlaylistItems.id');
    const mappedItems = items.map((item) => ({ item, playlistId, createdBy }));
    return await this.playlistItemService.insertMany(mappedItems);
  }

  private async updatePlaylistItems({ playlistId, items, createdBy }: CreatePlaylistParameters) {
    if (!playlistId || typeof playlistId === 'string') throw new Error('wrong type in createPlaylistItems.id');
    const mappedItems = items.map((item) => ({ item, playlistId, createdBy }));
    return await this.playlistItemService.insertMany(mappedItems);
  } */

  protected buildAggregateQuery({
    userId,
    query,
    fullText = false,
    // textMatchingMode = 'and',
    tags,
    // TODO: Complete support for tagsMatchingMode (it's not exposed via controller)
    tagsMatchingMode = 'all', // all | any // TODO: Type this!
  }: SearchParameters) {
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
      // Search all fields in the index
      aggregateQuery = aggregateQuery.concat([
        {
          $match: {
            $text: { $search: query },
          },
        },
      ]);
    }

    // Match by user ID if it's available as it's indexed and this is the best way to reduce the number of results early
    if (userId) {
      aggregateQuery = aggregateQuery.concat([
        {
          $match: {
            createdBy: ObjectIdGuard(userId),
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

    aggregateQuery = aggregateQuery.concat([...this.buildFields()]);

    if (query) {
      aggregateQuery = aggregateQuery.concat([{ $sort: { score: { $meta: 'textScore' } } }]);
    }

    return aggregateQuery;
  }

  protected buildFields() {
    return [
      { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'author' } },
      { $lookup: { from: 'media_item', localField: 'mediaIds', foreignField: '_id', as: 'mediaItems' } },
      { $lookup: { from: 'playlist_item', localField: '_id', foreignField: 'playlistId', as: 'playlistItems' } },
      { $lookup: { from: 'share_item', localField: '_id', foreignField: 'playlistId', as: 'shareItems' } },
      { $lookup: { from: 'view_item', localField: '_id', foreignField: 'playlistId', as: 'viewItems' } },
      { $lookup: { from: 'like_item', localField: '_id', foreignField: 'playlistId', as: 'likeItems' } },
      { $unwind: { path: '$author' } },
      {
        $addFields: {
          authorProfile: {
            authorId: '$author._id',
            authorName: { $concat: ['$author.firstName', ' ', '$author.lastName'] },
            authorUsername: '$author.username',
            authorImage: '$author.imageSrc',
          },
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
              userId: '$author._id',
              username: '$author.username',
              authorProfile: '$authorProfile',
              title: '$title',
              description: '$description',
              imageSrc: '$imageSrc',
              category: '$category',
              tags: '$tags',
              mediaItems: '$mediaItems',
              playlistItems: '$playlistItems',
              shareCount: { $size: '$shareItems' },
              likesCount: { $size: '$likeItems' },
              viewCount: { $size: '$viewItems' },
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
