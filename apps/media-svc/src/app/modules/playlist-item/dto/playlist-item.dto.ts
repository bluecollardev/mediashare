import { ApiProperty } from '@nestjs/swagger';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
// import { AuthorProfileDto } from '../user/dto/profile.dto';

export class PlaylistItemDto extends ApiBaseDto {
  // @ApiProperty({ type: () => AuthorProfileDto })
  // authorProfile: AuthorProfileDto;

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
