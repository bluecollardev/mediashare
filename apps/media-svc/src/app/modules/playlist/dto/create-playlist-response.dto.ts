import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistItemResponseDto } from '../../playlist-item/dto/playlist-item-response.dto';

export class CreatePlaylistResponseDto extends Playlist {
  @ApiProperty({ type: () => PlaylistItemResponseDto, isArray: true })
  playlistItems: PlaylistItemResponseDto[];
}
