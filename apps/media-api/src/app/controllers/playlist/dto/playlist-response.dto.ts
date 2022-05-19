import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { Playlist } from '../entities/playlist.entity';
import { AuthorProfileDto } from '../../user/dto/profile.dto';

export class PlaylistResponseDto extends Playlist {
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
