import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from '../entities/playlist.entity';
import { AuthorProfileDto } from '@api-modules/user/dto/profile.dto';
import { PlaylistItemResponseDto } from '@api-modules/playlist-item/dto/playlist-item-response.dto';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';

export class PlaylistResponseDto extends Playlist {
  @ApiProperty({ type: () => AuthorProfileDto })
  authorProfile: AuthorProfileDto;

  @ApiProperty({ type: () => MediaItem, isArray: true })
  mediaItems: MediaItem[];

  @ApiProperty({ type: () => PlaylistItemResponseDto, isArray: true })
  playlistItems: PlaylistItemResponseDto[];

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
