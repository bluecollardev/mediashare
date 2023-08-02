// import { UserConnectionDto } from '../user-connection/dto/user-connection.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MediaItemDto } from '../../media-item/dto/media-item.dto';
import { PlaylistDto } from '../../playlist/dto/playlist.dto';

export class MediaShareItemResponseDto extends MediaItemDto {
  @ApiProperty({ type: 'string' })
  shareId?: string;

  @ApiProperty({ type: 'string' })
  mediaItemId?: string;
}

export class PlaylistShareItemResponseDto extends PlaylistDto {
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

// TODO: Fix this type!
export class ShareItemsByUserIdDto {
  @ApiProperty({ name: 'shareItemByUserIds', type: () => String, isArray: true })
  shareItemByUserIds: any[];
  // shareItemByUserIds: UserConnectionDto[];
}
