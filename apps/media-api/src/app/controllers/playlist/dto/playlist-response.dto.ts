import { ApiProperty, PickType } from '@nestjs/swagger';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistItemResponseDto } from './playlist-response-item.dto';

class PlaylistResponseDto extends PickType(Playlist, ['_id']) {
  @ApiProperty({ name: 'playlist media items for user', type: () => PlaylistItemResponseDto, description: 'Playlist response DTO' })
  mediaItems: PlaylistItemResponseDto[];
}

export { PlaylistItemResponseDto, PlaylistResponseDto };
