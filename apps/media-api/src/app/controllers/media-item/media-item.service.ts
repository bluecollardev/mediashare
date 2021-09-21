import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { MediaItem } from './entities/media-item.entity';

import * as R from 'remeda';
@Injectable()
export class MediaItemService extends DataService<MediaItem, MongoRepository<MediaItem>> {
  constructor(
    @InjectRepository(MediaItem)
    mediaRepository: MongoRepository<MediaItem>,
    logger: PinoLogger
  ) {
    super(mediaRepository, logger);
  }

  findPlaylistMedia(idStrings: ObjectId[]) {
    return this.repository.find({
      where: {
        $or: R.map(idStrings, (id) => ({
          _id: id,
        })),
      },
    });
  }

  findMediaItemWithDetail(id: ObjectId) {
    return this.repository
      .aggregate([
        { $match: { _id: id } },

        {
          $lookup: {
            from: 'user',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              _id: '$_id',
              author: '$user.username',
              description: '$description',
              category: '$category',
              title: '$title',
              userId: '$userId',
            },
          },
        },
      ])
      .next();
  }

  findMediaItemsByUserId(userId: ObjectId) {
    return this.repository
      .aggregate([
        { $match: { createdBy: userId } },

        {
          $lookup: {
            from: 'user',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: { path: '$user' } },
        {
          $replaceRoot: {
            newRoot: {
              _id: '$_id',
              author: '$user.username',
              description: '$description',
              category: '$category',
              title: '$title',
              userId: '$userId',
              createdAt: '$createdAt',
              updatedAt: '$updatedAt',
            },
          },
        },
      ])
      .next();
  }
}
