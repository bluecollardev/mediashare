import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './entities/playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistService } from './services/playlist.service';
import { MediaItem } from '../media-item/entities/media-item.entity';
import { PlaylistItem } from '../../modules/playlist-item/entities/playlist-item.entity';
import { PlaylistItemService } from '../../modules/playlist-item/services/playlist-item.service';
import { ShareItemModule } from '../../modules/share-item/share-item.module';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, MediaItem, PlaylistItem]), ShareItemModule, AuthModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistItemService],
})
export class PlaylistModule {}
