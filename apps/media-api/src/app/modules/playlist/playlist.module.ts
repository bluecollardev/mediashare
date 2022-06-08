import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AuthModule } from '@api-modules/auth/auth.module';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './entities/playlist.entity';
import { PlaylistItemService } from '@api-modules/playlist-item/playlist-item.service';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Playlist, MediaItem, PlaylistItem]), ShareItemModule, AuthModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistItemService],
})
export class PlaylistModule {}
