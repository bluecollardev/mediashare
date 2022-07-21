import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AuthModule } from '@api-modules/auth/auth.module';
import { SearchController } from './search.controller';
import { Playlist } from '@api-modules/playlist/entities/playlist.entity';
import { PlaylistService } from '@api-modules/playlist/playlist.service';
import { PlaylistItemService } from '@api-modules/playlist-item/playlist-item.service';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Playlist, MediaItem, PlaylistItem]), ShareItemModule, AuthModule],
  controllers: [SearchController],
  providers: [PlaylistService, PlaylistItemService],
})
export class SearchModule {}
