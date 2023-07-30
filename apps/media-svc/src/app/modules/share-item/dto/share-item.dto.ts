import { MediaItem } from '../../media-item/entities/media-item.entity';
import { UserConnectionDto } from '../user-connection/dto/user-connection.dto';
import { AuthorProfileDto } from '../user/dto/profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MediaItemResponseDto } from '../../media-item/dto/media-item-response.dto';
import { PlaylistResponseDto } from '../../playlist/dto/playlist-response.dto';

export class MediaShareItemResponseDto extends MediaItemResponseDto {
  @ApiProperty({ type: 'string' })
  shareId?: string;

  @ApiProperty({ type: 'string' })
  mediaItemId?: string;
}

export class PlaylistShareItemResponseDto extends PlaylistResponseDto {
  @ApiProperty({ type: 'string' })
  shareId?: string;

  @ApiProperty({ type: 'string' })
  playlistId?: string;
}

export class ShareItemsResponseDto {
  @ApiProperty({ name: 'mediaItems', type: () => MediaShareItemResponseDto })
  mediaItems: MediaShareItemResponseDto[];

  @ApiProperty({ name: 'playlists', type: () => PlaylistShareItemResponseDto })
  playlists: PlaylistShareItemResponseDto[];
}

export class ShareItemsDto {
  @ApiProperty({ name: 'shareItemIds', type: () => String, isArray: true })
  shareItemIds: string[];
}

export class ShareItemsByUserIdDto {
  @ApiProperty({ name: 'shareItemByUserIds', type: () => String, isArray: true })
  shareItemByUserIds: UserConnectionDto[];
}
