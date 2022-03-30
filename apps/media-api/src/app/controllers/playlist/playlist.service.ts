import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DataService } from '@api';
import { UserService } from '@api-modules/auth/user.service';
import { PlaylistItemService } from '@api-modules/playlist-item/playlist-item.service';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ObjectIdParameters, ContentSearchParameters, SearchParameters } from '@mediashare/shared';

type CreatePlaylistParameters = {
  playlistId: ObjectId;
  items: string[];
  createdBy: ObjectId;
};

@Injectable()
export class PlaylistService extends DataService<Playlist, MongoRepository<Playlist>> {
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

  // We can't use the TypeORM driver for this, as it doesn't support weights, use the official Node.js driver instead
  // TODO: Support weights and upgrade MongoDB, for now we're just going to remove description as we can't weight the results...
  /* private createCollectionIndex() {
    const db = this.repository.manager.queryRunner.databaseConnection.db('mediashare')
    const collection = db.collection('playlists');
    const await collection.createIndex();
  } */

  // TODO: Support weights and upgrade MongoDB, for now we're just going to remove description as we can't weight the results...
  // private _collectionIndexName = 'title_text_description_text';
  private _collectionIndexName = 'title_text';

  get collectionIndexName() {
    return this._collectionIndexName;
  }

  set collectionIndexName(name) {
    this._collectionIndexName = name;
  }

  // TODO: Finish this later... options could be Elastic, Mongo Atlas Search or Apache Lucene
  get useDistributedSearch() {
    return false; // this.configService.get<string>('dbIsMongoAtlas');
  }

  async createPlaylistWithItems(dto: CreatePlaylistDto & { createdBy: ObjectId }) {
    const playlist = await this.create({ ...dto, mediaIds: dto.mediaIds.map((id) => new ObjectId(id)) });
    return { playlist };
  }

  createPlaylistItems({ playlistId, items, createdBy }: CreatePlaylistParameters) {
    if (!playlistId || typeof playlistId === 'string') throw new Error('wrong type in createPlaylistItems.id');
    const mappedItems = items.map((item) => ({ item, playlistId, createdBy }));
    return this.playlistItemService.insertMany(mappedItems);
  }

  getPlaylistById({ playlistId }: ObjectIdParameters) {
    return this.repository
      .aggregate([
        {
          $match: { _id: playlistId },
        },
        ...this.buildLookupFields(),
        {
          $unwind: { path: '$user' },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  _id: '$_id',
                  author: '$user.username',
                  title: '$title',
                  description: '$description',
                  imageSrc: '$imageSrc',
                  mediaItems: '$mediaItems',
                  category: '$category',
                  tags: '$tags',
                  shareCount: { $size: '$shareItems' },
                  likesCount: { $size: '$likeItems' },
                  viewCount: { $size: '$viewItems' },
                  // shared: { $count: '$shareItems' }
                  createdBy: '$user._id',
                  createdAt: '$createdAt',
                  updatedDate: '$updatedDate',
                },
              ],
            },
          },
        },
      ])
      .next();
  }

  async getPlaylistsByUserId({ userId }: ObjectIdParameters = { userId: null }) {
    return this.repository
      .aggregate([
        {
          $match: {
            createdBy: userId,
          },
        },
        ...this.buildLookupFields(),
        { $unwind: { path: '$user' } },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  _id: '$_id',
                  author: '$user.username',
                  title: '$title',
                  description: '$description',
                  imageSrc: '$imageSrc',
                  mediaItems: '$mediaItems',
                  category: '$category',
                  tags: '$tags',
                  createdBy: '$user._id',
                  createdAt: '$createdAt',
                  updatedDate: '$updatedDate',
                },
              ],
            },
          },
        },
      ])
      .toArray();
  }

  async searchPlaylists({ query, tags }: ContentSearchParameters) {
    return this.repository
      .aggregate([
        ...this.buildAggregateQuery({ query, tags }),
        ...this.buildLookupFields(),
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  _id: '$_id',
                  author: '$user.username',
                  title: '$title',
                  description: '$description',
                  imageSrc: '$imageSrc',
                  mediaItems: '$mediaItems',
                  category: '$category',
                  tags: '$tags',
                  shareCount: { $size: '$shareItems' },
                  likesCount: { $size: '$likeItems' },
                  viewCount: { $size: '$viewItems' },
                  // shared: { $count: '$shareItems' }
                  createdBy: '$user._id',
                  createdAt: '$createdAt',
                  updatedDate: '$updatedDate',
                },
              ],
            },
          },
        },
      ])
      .toArray();
  }

  private buildAggregateQuery(
    {
      userId,
      query,
      fullText = false,
      // textMatchingMode = 'and',
      tags,
      // TODO: Complete support for tagsMatchingMode (it's not exposed via controller)
      tagsMatchingMode = 'all' // all | any // TODO: Type this!
    } : SearchParameters) {

    let aggregateQuery = [];

    // Match by user ID first as it's indexed and this is the best way to reduce the number of results early
    if (userId) {
      aggregateQuery = aggregateQuery.concat([
        {
          $match: {
            createdBy: userId,
          },
        }
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
        })
      } else if (tagsMatchingMode === 'all') {
        aggregateQuery.push({
          $match: {
            // TODO: User tags?
            // createdBy: userId,
            matchedTags: { $all: tags },
          },
        })
      }
    }

    aggregateQuery = aggregateQuery.concat([
      ...this.buildLookupFields()
    ])

    if (query) {
      aggregateQuery = aggregateQuery.concat([{ $sort: { score: { $meta: 'textScore' } } }]);
    }

    return aggregateQuery;
  }

  private buildLookupFields() {
    return [
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
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'share_item',
          localField: '_id',
          foreignField: 'playlistId',
          as: 'shareItems',
        },
      },
      {
        $lookup: {
          from: 'view_item',
          localField: '_id',
          foreignField: 'playlistId',
          as: 'viewItems',
        },
      },
      {
        $lookup: {
          from: 'like_item',
          localField: '_id',
          foreignField: 'playlistId',
          as: 'likeItems',
        },
      },
    ];
  }
}
