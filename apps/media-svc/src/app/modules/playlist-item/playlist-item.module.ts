import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItem } from '../share-item/entities/share-item.entity';
import { ShareItemModule } from '../share-item/share-item.module';
import { ShareItemService } from '../share-item/share-item.service';
import { PlaylistItemService } from './playlist-item.service';
import { PlaylistItemController } from './playlist-item.controller';
import { PlaylistItem } from './entities/playlist-item.entity';
import { MediaItemModule } from '../media-item/media-item.module';
import { MediaItemService } from '../media-item/media-item.service';
import { MediaItem } from '../media-item/entities/media-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistItem, MediaItem, ShareItem]), MediaItemModule, ShareItemModule],
  controllers: [PlaylistItemController],
  providers: [PlaylistItemService, MediaItemService, ShareItemService],
})
export class PlaylistItemModule {}
