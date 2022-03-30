import { ApiProperty } from '@nestjs/swagger';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { PlaylistItemResponseDto } from '../../playlist/dto/playlist-response.dto';

class ShareItemsResponseDto {
  @ApiProperty({ name: 'Media Items', type: () => PlaylistItemResponseDto, description: 'all items that are shared with a particular user' })
  mediaItems: MediaItem[];
  playlists: PlaylistItemResponseDto[];
}

export { ShareItemsResponseDto };
