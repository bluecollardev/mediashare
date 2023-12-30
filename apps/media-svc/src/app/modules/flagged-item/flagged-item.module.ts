import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlaggedItemController } from './flagged-item.controller';
import {
  FlaggedItemDataService,
  FlaggedItemService,
} from './flagged-item.service';
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
import { FlaggedItemMapping } from '../flagged-item/mappers/automapper.profile';
import { FlaggedItem } from './entities/flagged-item.entity';
import { MediaItem } from '../media-item/entities/media-item.entity';
import { Playlist } from '../playlist/entities/playlist.entity';
import { PlaylistItem } from '../playlist-item/entities/playlist-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlaggedItem, MediaItem, Playlist, PlaylistItem]),
    MediaItemModule,
    PlaylistModule,
    PlaylistItemModule,
  ],
  controllers: [FlaggedItemController],
  providers: [
    FlaggedItemService,
    FlaggedItemDataService,
    FlaggedItemMapping,
    MediaItemService,
    MediaItemDataService,
    PlaylistService,
    PlaylistDataService,
    PlaylistItemService,
    PlaylistItemDataService,
  ],
  exports: [FlaggedItemService],
})
export class FlaggedItemModule {}
