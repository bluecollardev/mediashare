import { MediaItemService } from '../media-item/media-item.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import { SearchController } from './search.controller';
import { Playlist } from '../playlist/entities/playlist.entity';
import { PlaylistService } from '../playlist/playlist.service';
import { PlaylistItemService } from '../playlist-item/playlist-item.service';
import { PlaylistItem } from '../playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../media-item/entities/media-item.entity';
import { ShareItemModule } from '../share-item/share-item.module';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Playlist, PlaylistItem, MediaItem]), ShareItemModule],
  controllers: [SearchController],
  providers: [PlaylistService, PlaylistItemService, MediaItemService],
})
export class SearchModule {}
