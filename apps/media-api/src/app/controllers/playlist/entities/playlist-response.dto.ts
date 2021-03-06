import { ApiArray } from '@mediashare/shared';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from './playlist.entity';

class PlaylistResponseFields {
  @ApiArray({ type: MediaItem, readOnly: true })
  mediaItems: Readonly<MediaItem[]>;

  @ApiProperty({ type: Playlist, readOnly: true })
  playlist: Readonly<PlaylistItem>;
}

export class PlaylistResponseDto extends IntersectionType(PlaylistItem, PlaylistResponseFields) {}

export class PlaylistResponseItemDto {}
