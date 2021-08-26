import { ApiProperty, PickType } from '@nestjs/swagger';
import { MediaItem } from '../../media-item/entities/media-item.entity';
import { UserDto } from '../../user/dto/create-user.dto';
import { Playlist } from '../entities/playlist.entity';
import { PlaylistItemResponseDto } from './playlist-response-item.dto';

class PlaylistResponseDto extends Playlist {
  @ApiProperty({ type: () => MediaItem, isArray: true })
  mediaItems: MediaItem[];
  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}

export { PlaylistItemResponseDto, PlaylistResponseDto };
