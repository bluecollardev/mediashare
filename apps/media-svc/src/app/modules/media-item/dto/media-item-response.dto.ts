import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../entities/media-item.entity';
// import { AuthorProfileDto } from '../user/dto/profile.dto';

export class MediaItemResponseDto extends MediaItem {
  // TODO: Fix this type!
  // @ApiProperty({ type: () => AuthorProfileDto })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // @ApiProperty({ type: () => {} })
  // authorProfile: AuthorProfileDto;
  // authorProfile: any;

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
