import { ApiProperty } from '@nestjs/swagger';
import { PlaylistItem } from '../entities/playlist-item.entity';
import { AuthorProfileDto } from '@api-modules/user/dto/profile.dto';

export class PlaylistItemResponseDto extends PlaylistItem {
  @ApiProperty({ type: () => AuthorProfileDto })
  authorProfile: AuthorProfileDto;

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
