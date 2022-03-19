import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { mapPlaylistItems } from '@api-modules/playlist-item/functors/map-playlist-item.functor';
import { Playlist, PlaylistByUserResponseDto } from '../entities/playlist.entity';

import { PlaylistItemService } from '@api-modules/playlist-item/services/playlist-item.service';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';

import * as R from 'remeda';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';

import { OptionalObjectIdParameters } from '@mediashare/shared';
import { UserService } from '@api-modules/auth/user.service';

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
    this.repository.createCollectionIndex({ title: 'text', description: 'text' });
  }

  /**
   *
   *
   * @param {{ mediaIds: string[]; userId: ObjectId }} { userId, mediaIds }
   * @memberof PlaylistService
   */
  async createPlaylistWithItems(dto: CreatePlaylistDto & { createdBy: ObjectId }) {
    const playlist = await this.create({ ...dto, mediaIds: dto.mediaIds.map((id) => new ObjectId(id)) });
    return { playlist };
  }

  /**
   *
   *
   * @param {{ playlistId: ObjectId; items: Partial<PlaylistItem>[] }} { playlistId, items }
   * @return {*}
   * @memberof PlaylistService
   */
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
              $or: R.map(ObjectIds, (id) => ({
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
        $or: R.map(playlistIds, (id) => ({
          _id: id,
        })),
      },
    });
  }

  /* FIXME: hack-around for getting a user when one doesn't exist */
  async getPlaylistByUserId({ userId }: OptionalObjectIdParameters = { userId: null }) {
    return this.repository
      .aggregate([
        {
          $match: { createdBy: userId },
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
      ])
      .toArray();
  }
  searchPlaylists({ query }: { query: string }) {
    return this.repository
      .aggregate([
        { $match: { $text: { $search: query } } },
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
        { $sort: { score: { $meta: 'textScore' } } },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  _id: '$_id',
                  author: '$user.username',
                  category: '$category',
                  createdAt: '$createdAt',
                  createdBy: '$user._id',
                  description: '$description',
                  imageSrc: '$imageSrc',
                  mediaItems: '$mediaItems',
                  title: '$title',
                  shareCount: { $size: '$shareItems' },
                  likesCount: { $size: '$likeItems' },
                  viewCount: { $size: '$viewItems' },
                  // shared: { $count: '$shareItems' }
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
                  createdAt: '$createdAt',
                  createdBy: '$user._id',
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
