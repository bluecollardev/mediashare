import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.provider';
import { ShareItemModule } from '../share-item/share-item.module';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './entities/playlist.entity';
import { PlaylistItemService } from '../playlist-item/playlist-item.service';
import { PlaylistItem } from '../playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../media-item/entities/media-item.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Playlist, MediaItem, PlaylistItem]), ShareItemModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistItemService, AppConfigService],
})
export class PlaylistModule implements NestModule {}
