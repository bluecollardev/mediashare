import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';
import { ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistItemResponseDto } from './playlist-response-item.dto';

class PlaylistResponseDto extends Playlist {
  @ApiString()
  author: string;
  @ApiProperty({ type: () => MediaItem, isArray: true })
  mediaItems: MediaItem[];
  @ApiProperty({ type: () => TagKeyValue, isArray: true })
  tags: TagKeyValue[];
  @ApiProperty({ type: 'number' })
  shareCount?: number;
  @ApiProperty({ type: 'number' })
  viewCount?: number;
  @ApiProperty({ type: 'number' })
  likesCount?: number;
}

export { PlaylistItemResponseDto, PlaylistResponseDto };
