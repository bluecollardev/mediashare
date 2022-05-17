import { ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../entities/media-item.entity';
import { AuthorProfileDto } from '../../user/dto/profile.dto';

export class MediaItemResponseDto extends MediaItem {
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

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
