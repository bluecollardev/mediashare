import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistItemResponseDto } from './playlist-response-item.dto';

class PlaylistResponseDto extends Playlist {
  @ApiProperty({ type: () => MediaItem, isArray: true })
  mediaItems: MediaItem[];
  author: string;
  shareCount?: number;
  viewCount?: number;
}

export { PlaylistItemResponseDto, PlaylistResponseDto };
