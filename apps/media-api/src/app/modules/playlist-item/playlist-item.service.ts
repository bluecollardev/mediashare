import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectIdGuard } from '@util-lib';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
import { FilterableDataService } from '@api';
import { PlaylistItem } from './entities/playlist-item.entity';
import { SearchParameters } from '@mediashare/shared';

@Injectable()
export class PlaylistItemService extends FilterableDataService<PlaylistItem, MongoRepository<PlaylistItem>> {
  constructor(
    @InjectRepository(PlaylistItem)
    repository: MongoRepository<PlaylistItem>,
    logger: PinoLogger
    // private configService: ConfigService
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

    // Match by user ID first as it's indexed and this is the best way to reduce the number of results early
    if (userId) {
      aggregateQuery = aggregateQuery.concat([
        {
          $match: {
            createdBy: ObjectIdGuard(userId),
          },
        },
      ]);
    }

    // Next, we want to match the text as it's also indexed
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
      // { $lookup: { from: 'share_item', localField: '_id', foreignField: 'playlistItemId', as: 'shareItems' } },
      // { $lookup: { from: 'view_item', localField: '_id', foreignField: 'playlistItemId', as: 'viewItems' } },
      // { $lookup: { from: 'like_item', localField: '_id', foreignField: 'playlistItemId', as: 'likeItems' } },
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
              playlistId: '$playlistId',
              mediaId: '$mediaId',
              userId: '$author._id',
              username: '$author.username',
              author: '$author',
              authorProfile: '$authorProfile',
              title: '$title',
              description: '$description',
              sortIndex: '$sortIndex',
              uri: '$uri',
              thumbnail: '$thumbnail',
              // category: '$category',
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
