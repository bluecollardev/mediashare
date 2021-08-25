import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { PlaylistItem } from '../entities/playlist-item.entity';
import { ObjectIdParameters } from '@mediashare/shared';

@Injectable()
export class PlaylistItemService extends DataService<PlaylistItem, MongoRepository<PlaylistItem>> {
  private get playlistAggregationPipeline() {
    return [
      {
        $lookup: {
          from: 'media_item',
          localField: 'mediaId',
          foreignField: '_id',
          as: 'mediaItems',
        },
      },
      {
        $unwind: {
          path: '$mediaItems',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ playlistItemId: '$_id', mediaId: '$mediaId', playlistId: '$playlistId', userId: 0 }, '$mediaItems'],
          },
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
        $unwind: {
          path: '$playlist',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            _id: '$mediaId',
            playlistId: '$playlistId',
            userId: '$userId',
            playlistItemId: '$playlistItemId',
            summary: '$summary',
            isPlayable: '$isPlayable',
            description: '$description',
            category: '$category',
            title: '$title',
            playlistTitle: '$playlist.title',
          },
        },
      },
      {
        $group: { _id: '$playlistId', title: { $first: '$playlistTitle' }, mediaItems: { $push: '$$ROOT' } },
      },
    ];
  }
  constructor(
    @InjectRepository(PlaylistItem)
    public repository: MongoRepository<PlaylistItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  aggregatePlaylistAndItemByIdField(params: Partial<ObjectIdParameters>) {
    return this.repository
      .aggregate([
        {
          $match: { ...params },
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
          $unwind: { path: '$playlist' },
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
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: { path: '$mediaItems' } },
        { $unwind: { path: '$user' } },
        {
          $group: {
            _id: '$playlist._id',
            title: { $first: '$playlist.title' },
            userId: { $first: '$playlist.userId' },
            mediaItems: {
              $push: { $mergeObjects: ['$mediaItems', { playlistItemId: '$_id' }] },
            },
          },
        },
      ])
      .toArray();
  }

  aggregatePlaylistAndItem() {
    return this.repository.find();
  }
}
