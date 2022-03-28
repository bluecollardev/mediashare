import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DataService } from '@api';
import { UserService } from '@api-modules/auth/user.service';
import { PlaylistItemService } from '@api-modules/playlist-item/services/playlist-item.service';
import { Playlist } from '../entities/playlist.entity';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
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
      .createCollectionIndex({ title: 'text', description: 'text' })
      .then((indexName) => {
        this.collectionIndexName = indexName;
      });
  }

  // We can't use the TypeORM driver for this, as it doesn't support weights, use the official Node.js driver instead
  private createCollectionIndex() {
    /* const db = this.repository.manager.queryRunner.databaseConnection.db('mediashare')
    const collection = db.collection('playlists')
    const await collection.createIndex() */
  }

  private _collectionIndexName = 'title_text_description_text';

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
      tagsMatchingMode = 'all'
    } : SearchParameters) {

    let aggregateQuery = [];

    if (userId) {
      aggregateQuery = aggregateQuery.concat([
        {
          $match: {
            createdBy: userId,
          },
        }
      ]);
    }

    if (tags) {
      aggregateQuery = aggregateQuery.concat([
        {
          $addFields: {
            matchedTags: '$tags.key',
          },
        },
        {
          $match: {
            // createdBy: userId,
            matchedTags: { $in: tags },
          },
        },
      ]);
    }

    if (query && fullText) {
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
