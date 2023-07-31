import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItem } from '../share-item/entities/share-item.entity';
import { ShareItemModule } from '../share-item/share-item.module';
import { ShareItemService } from '../share-item/share-item.service';
import { MediaItemService } from './media-item.service';
import { MediaItemController } from './media-item.controller';
import { MediaItem } from './entities/media-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaItem, ShareItem]), ShareItemModule],
  controllers: [MediaItemController],
  providers: [MediaItemService, ShareItemService],
})
export class MediaItemModule {}
