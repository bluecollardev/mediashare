import { ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { AuthorProfileDto } from '../../user/dto/profile.dto';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistItemResponseDto } from './playlist-response-item.dto';

class PlaylistResponseDto extends Playlist {
  /**
   * @deprecated This is being replaced with authorProfile
   */
  @ApiString()
  username: string;

  /**
   * @deprecated This is being replaced with authorProfile
   */
  @ApiString()
  author: string;

  @ApiProperty({ type: () => AuthorProfileDto })
  authorProfile: AuthorProfileDto;

  @ApiProperty({ type: () => MediaItem, isArray: true })
  mediaItems: MediaItem[];

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}

export { PlaylistItemResponseDto, PlaylistResponseDto };
