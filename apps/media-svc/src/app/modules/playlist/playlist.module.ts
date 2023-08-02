import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItem } from '../share-item/entities/share-item.entity';
import { ShareItemModule } from '../share-item/share-item.module';
import { ShareItemDataService, ShareItemService } from '../share-item/share-item.service';
import { PlaylistDataService, PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './entities/playlist.entity';
import { PlaylistItemDataService, PlaylistItemService } from '../playlist-item/playlist-item.service';
import { PlaylistItem } from '../playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../media-item/entities/media-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist, MediaItem, PlaylistItem, ShareItem]),
    ShareItemModule
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistDataService, PlaylistItemService, PlaylistItemDataService, ShareItemService, ShareItemDataService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
