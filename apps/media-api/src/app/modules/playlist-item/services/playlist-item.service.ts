import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { PlaylistItem } from '../entities/playlist-item.entity';

import * as R from 'remeda';
@Injectable()
export class PlaylistItemService extends DataService<PlaylistItem, MongoRepository<PlaylistItem>> {
  constructor(
    @InjectRepository(PlaylistItem)
    public repository: MongoRepository<PlaylistItem>,
    logger: PinoLogger
  ) {
    super(repository, logger);
  }

  async findByUserId(userIdStr: string) {
    const userId = new ObjectId(userIdStr);

    const playlistItems = await this.repository.find({ userId });

    return playlistItems;
  }

  getMediaItemsFromPlaylistId() {
    return this.repository.aggregate([
      {
        $lookup: {
          from: 'mediaItems',
          localField: 'mediaId',
          foreignField: '_id',
          as: 'mediaItems',
        },
      },
    ]);
  }

  aggregatePlaylistAndItem() {
    const query = this.repository.aggregate([
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
            $mergeObjects: [
              {
                playlistItemId: '$playlistItemId',
                mediaId: '$mediaId',
                playlistId: '$playlistId',
                userId: 0,
              },
              '$mediaItems',
            ],
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
            $mergeObjects: [
              {
                mediaTitle: '$title',
                _id: '$mediaId',
                playlistId: '$playlistId',
                userId: '$userId',
                summary: '$summary',
                isPlayable: '$isPlayable',
                description: '$description',
                mediaCategory: '$category',
              },
              '$playlist',
            ],
          },
        },
      },
      {
        $group: { _id: '$playlistId', mediaItems: { $push: '$$ROOT' } },
      },
    ]);
  }
}
