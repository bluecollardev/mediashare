import { ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../entities/media-item.entity';

export class MediaItemResponseDto extends MediaItem {
  @ApiString()
  username: string;

  @ApiString()
  author: string;

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
