import { ApiProperty } from '@nestjs/swagger';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { Playlist } from '../entities/playlist.entity';

class CreatePlaylistResponseDto {
  @ApiProperty({ readOnly: true, type: Playlist })
  playlist: Playlist;

  @ApiProperty()
  playlistItems: PlaylistItem[];
}

export { Playlist, CreatePlaylistResponseDto };
