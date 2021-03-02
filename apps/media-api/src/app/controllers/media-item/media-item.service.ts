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

  findMediaItemsByUserId(id: string) {
    const userId = new ObjectId(id);

    return this.repository.find({ userId });
  }
}
