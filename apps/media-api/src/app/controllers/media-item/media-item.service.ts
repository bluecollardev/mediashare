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
  static SEARCH_FIELDS = [
    {
      $lookup: {
        from: 'user',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $lookup: {
        from: 'share_item',
        localField: '_id',
        foreignField: 'mediaId',
        as: 'shareItems'
      }
    },
    {
      $lookup: {
        from: 'view_item',
        localField: '_id',
        foreignField: 'mediaId',
        as: 'viewItems'
      }
    },
    {
      $lookup: {
        from: 'like_item',
        localField: '_id',
        foreignField: 'mediaId',
        as: 'likeItems'
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          _id: '$_id',
          title: '$title',
          description: '$description',
          author: '$user.username',
          userId: '$userId',
          uri: '$uri',
          thumbnail: '$thumbnail',
          category: '$category',
          tags: '$tags',
          shareCount: { $size: '$shareItems' },
          likesCount: { $size: '$likeItems' },
          viewCount: { $size: '$viewItems' },
          createdAt: '$createdAt',
          createdBy: '$user._id',
          updatedDate: '$updatedDate',
        }
      }
    }
  ];
  constructor(
    @InjectRepository(MediaItem)
    mediaRepository: MongoRepository<MediaItem>,
    logger: PinoLogger
  ) {
    super(mediaRepository, logger);
    this.repository.createCollectionIndex({ title: 'text', description: 'text' }).then();
  }

  findPlaylistMedia(idStrings: ObjectId[]) {
    return this.repository.find({
      where: {
        $or: R.map(idStrings, (id) => ({
          _id: id
        }))
      }
    });
  }

  findMediaItemWithDetail(id: ObjectId) {
    return this.repository.aggregate([{ $match: { _id: id } }, ...MediaItemService.SEARCH_FIELDS]).next();
  }

  findMediaItemsByUserId(userId: ObjectId) {
    return this.repository
      .aggregate([
        { $match: { createdBy: userId } }

        // {
        //   $lookup: {
        //     from: 'user',
        //     localField: 'createdBy',
        //     foreignField: '_id',
        //     as: 'user'
        //   }
        // }
        // { $unwind: { path: '$user' } }
        // {
        //   $replaceRoot: {
        //     newRoot: {
        //       _id: '$_id',
        //       author: '$user.username',
        //       description: '$description',
        //       category: '$category',
        //       title: '$title',
        //       userId: '$userId',
        //       createdAt: '$createdAt',
        //       updatedAt: '$updatedAt'
        //     }
        //   }
        // }
      ])
      .toArray();
  }
  findPopularMediaItems() {
    return this.repository.aggregate([...MediaItemService.SEARCH_FIELDS, { $sort: { likesCount: -1 } }]).toArray();
  }

  searchMediaItems({ query }: { query: string }) {
    return this.repository.aggregate([{ $match: { $text: { $search: query } } }, { $sort: { score: { $meta: 'textScore' } } }]).toArray();
  }
}
