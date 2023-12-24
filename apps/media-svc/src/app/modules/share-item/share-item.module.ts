import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItemController } from './share-item.controller';
import { ShareItemDataService, ShareItemService } from './share-item.service';
import { MediaItemModule } from '../media-item/media-item.module';
import {
  MediaItemDataService,
  MediaItemService,
} from '../media-item/media-item.service';
import { PlaylistModule } from '../playlist/playlist.module';
import {
  PlaylistDataService,
  PlaylistService,
} from '../playlist/playlist.service';
import { PlaylistItemModule } from '../playlist-item/playlist-item.module';
import {
  PlaylistItemDataService,
  PlaylistItemService,
} from '../playlist-item/playlist-item.service';
import { ShareItemMapping } from '../share-item/mappers/automapper.profile';
import { ShareItem } from './entities/share-item.entity';
import { MediaItem } from '../media-item/entities/media-item.entity';
import { Playlist } from '../playlist/entities/playlist.entity';
import { PlaylistItem } from '../playlist-item/entities/playlist-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShareItem, MediaItem, Playlist, PlaylistItem]),
    MediaItemModule,
    PlaylistModule,
    PlaylistItemModule,
  ],
  controllers: [ShareItemController],
  providers: [
    ShareItemService,
    ShareItemDataService,
    ShareItemMapping,
    MediaItemService,
    MediaItemDataService,
    PlaylistService,
    PlaylistDataService,
    PlaylistItemService,
    PlaylistItemDataService,
  ],
  exports: [ShareItemService],
})
export class ShareItemModule {}
