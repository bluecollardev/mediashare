import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { PlaylistItemResponseDto } from '../../playlist/dto/playlist-response.dto';

export class ShareItemsResponseDto {
  @ApiProperty({ name: 'sharedMedia', type: () => PlaylistItemResponseDto, description: 'all items that are shared with a particular user' })
  sharedMedia: MediaItem[];
  @ApiProperty({ name: 'sharedPlaylists', type: () => PlaylistItemResponseDto, description: 'all items that are shared with a particular user' })
  sharedPlaylists: PlaylistItemResponseDto[];
}
