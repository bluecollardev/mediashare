import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItemModule } from '../share-item/share-item.module';
import { PlaylistDataService, PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './entities/playlist.entity';
import { PlaylistMapping } from './mappers/automapper.profile';
import {
  PlaylistItemDataService,
  PlaylistItemService,
} from '../playlist-item/playlist-item.service';
import { PlaylistItem } from '../playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../media-item/entities/media-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, MediaItem, PlaylistItem])],
  controllers: [PlaylistController],
  providers: [
    PlaylistService,
    PlaylistDataService,
    PlaylistMapping,
    PlaylistItemService,
    PlaylistItemDataService,
  ],
  exports: [PlaylistService],
})
export class PlaylistModule {}
