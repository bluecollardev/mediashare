import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DataService } from '@api';
import { MediaItem } from './entities/media-item.entity';
import { map } from 'remeda';

@Injectable()
export class MediaItemService extends DataService<MediaItem, MongoRepository<MediaItem>> {
  static SEARCH_FIELDS = [
    {
      $lookup: {
        from: 'user',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $lookup: {
        from: 'share_item',
        localField: '_id',
        foreignField: 'mediaId',
        as: 'shareItems',
      },
    },
    {
      $lookup: {
        from: 'view_item',
        localField: '_id',
        foreignField: 'mediaId',
        as: 'viewItems',
      },
    },
    {
      $lookup: {
        from: 'like_item',
        localField: '_id',
        foreignField: 'mediaId',
        as: 'likeItems',
      },
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
        },
      },
    },
  ];

  constructor(
    @InjectRepository(MediaItem)
    mediaRepository: MongoRepository<MediaItem>,
    logger: PinoLogger,
    private configService: ConfigService,
  ) {
    super(mediaRepository, logger);
    this.repository.createCollectionIndex({ title: 'text', description: 'text' }).then();
  }

  findPlaylistMedia(idStrings: ObjectId[]) {
    return this.repository.find({
      where: {
        $or: map(idStrings, (id) => ({
          _id: id,
        })),
      },
    });
  }

  findMediaItemWithDetail(id: ObjectId) {
    return this.repository
      .aggregate([{ $match: { _id: id } }, ...MediaItemService.SEARCH_FIELDS]).next();
  }

  findMediaItemsByUserId(userId: ObjectId) {
    return this.repository
      .aggregate([
        { $match: { createdBy: userId } },

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
    return this.repository
      .aggregate([...MediaItemService.SEARCH_FIELDS, { $sort: { likesCount: -1 } }]).toArray();
  }

  searchMediaItems({ query, tags }: { query: string; tags?: string[] }) {
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

      if (query) {
        aggregateQuery = aggregateQuery.concat([{ $sort: { score: { $meta: 'textScore' } } }]);
      }

      return aggregateQuery;
    };

    return this.repository
      .aggregate([...buildAggregateQuery()]).toArray();
  }
}
