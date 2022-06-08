import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../entities/media-item.entity';
import { AuthorProfileDto } from '@api-modules/user/dto/profile.dto';

export class MediaItemResponseDto extends MediaItem {
  @ApiProperty({ type: () => AuthorProfileDto })
  authorProfile: AuthorProfileDto;

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
