import { DataService } from '@api';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
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
    @InjectPinoLogger(MediaItemService.name)
    private readonly injectedLogger: PinoLogger
  ) {
    super(mediaRepository, new MediaItem(), injectedLogger);
  }
}
