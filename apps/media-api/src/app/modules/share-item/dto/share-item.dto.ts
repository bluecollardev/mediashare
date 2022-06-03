import { ApiProperty } from '@nestjs/swagger';
import { MediaItemResponseDto } from '@api-modules/media-item/dto/media-item-response.dto';
import { PlaylistResponseDto } from '@api-modules/playlist/dto/playlist-response.dto';

export class ShareItemsResponseDto {
  @ApiProperty({ name: 'mediaItems', type: () => MediaItemResponseDto })
  mediaItems: MediaItemResponseDto[];

  @ApiProperty({ name: 'playlists', type: () => PlaylistResponseDto })
  playlists: PlaylistResponseDto[];
}
