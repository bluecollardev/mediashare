import { MediaItemDataService, MediaItemService } from '../media-item/media-item.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { Playlist } from '../playlist/entities/playlist.entity';
import { PlaylistDataService, PlaylistService } from '../playlist/playlist.service';
import { PlaylistItemDataService, PlaylistItemService } from '../playlist-item/playlist-item.service';
import { PlaylistItem } from '../playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../media-item/entities/media-item.entity';
import { ShareItemModule } from '../share-item/share-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, PlaylistItem, MediaItem]), ShareItemModule],
  controllers: [SearchController],
  providers: [PlaylistService, PlaylistDataService, PlaylistItemService, PlaylistItemDataService, MediaItemService, MediaItemDataService],
})
export class SearchModule {}
