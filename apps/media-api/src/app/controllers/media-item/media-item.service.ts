import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { MongoRepository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { MediaItem } from './entities/media-item.entity';

@Injectable()
export class MediaItemService extends DataService<
  MediaItem,
  MongoRepository<MediaItem>
> {
  constructor(
    @InjectRepository(User)
    mediaRepository: MongoRepository<MediaItem>,
    logger: PinoLogger
  ) {
    super(mediaRepository, new MediaItem(), logger);
  }
}
