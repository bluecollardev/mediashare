import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { Playlist, PlaylistByUserResponseDto } from '../entities/playlist.entity';
import { PlaylistItemService } from '@api-modules/playlist-item/services/playlist-item.service';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { OptionalObjectIdParameters } from '@mediashare/shared';
import { UserService } from '@api-modules/auth/user.service';
import { map } from 'remeda';

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
    private userService: UserService,
    private playlistItemService: PlaylistItemService
  ) {
    super(repository, logger);
    this.repository.createCollectionIndex({ title: 'text', description: 'text' }).then();
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

  findPlaylistsByList(ObjectIds: ObjectId[]): Promise<PlaylistByUserResponseDto[]> {
    return this.repository
      .aggregate([
        {
          $match: {
            where: {
              $or: map(ObjectIds, (id) => ({
                _id: id,
              })),
            },
          },
        },
      ])
      .toArray();
  }

  async queryPlaylistsById(playlistIds: ObjectId[]) {
    return this.repository.find({
      where: {
        $or: map(playlistIds, (id) => ({
          _id: id,
        })),
      },
    });
  }

  /* FIXME: hack-around for getting a user when one doesn't exist */
  async getPlaylistsByUserId({ userId }: OptionalObjectIdParameters = { userId: null }) {
    return this.repository
      .aggregate([
        {
          $match: {
            createdBy: userId,
          },
        },
        {
          $addFields: {
            matchedTags: '$tags.key',
          },
        },
        /* {
          $match: {
            matchedTags: { $in: [] },
          },
        }, */
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
        // {
        //   $lookup: {
        //     from: 'mediaItems',
        //     localField: 'mediaItems.createdBy',
        //     foreignField: '_id',
        //     as: 'user'
        //   }
        // },
        // { $unwind: { path: '$mediaItems' } },
        { $unwind: { path: '$user' } },
        // {
        //   $group: {
        //     _id: '$playlist._id',
        //     title: { $first: '$playlist.title' },
        //     userId: { $first: '$playlist.userId' },
        //     mediaItems: {
        //       $push: { $mergeObjects: ['$mediaItems', { playlistItemId: '$_id' }] }
        //     }
        //   }
        // }
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

  async searchPlaylists({ query, tags }: { query: string; tags?: string[] }) {
    const buildAggregateQuery = () => {
      let aggregateQuery = [];
      if (query) {
        aggregateQuery = aggregateQuery.concat([
          {
            $match: {
              $text: { $search: query },
            },
          },
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
      return aggregateQuery;
    };

    return this.repository
      .aggregate([
        ...buildAggregateQuery(),
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
        // { $sort: { score: { $meta: 'textScore' } } },
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
  getPlaylistById({ playlistId }: OptionalObjectIdParameters) {
    return this.repository
      .aggregate([
        {
          $match: { _id: playlistId },
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

  findall() {
    return this.playlistItemService.findAll();
  }
}
