// import { UserConnectionDto } from '../user-connection/tags/user-connection.tags';
import { ApiProperty } from '@nestjs/swagger';
import { MediaItemDto } from '../../media-item/dto/media-item.dto';
import { PlaylistDto } from '../../playlist/dto/playlist.dto';

export class MediaShareItemDto extends MediaItemDto {
  @ApiProperty({ type: 'string' })
  shareId?: string;

  @ApiProperty({ type: 'string' })
  mediaItemId?: string;

  @ApiProperty({ type: 'string' })
  playlistId?: string;
}

export class PlaylistShareItemDto extends PlaylistDto {
  @ApiProperty({ type: 'string' })
  shareId?: string;

  @ApiProperty({ type: 'string' })
  mediaItemId?: string;

  @ApiProperty({ type: 'string' })
  playlistId?: string;
}

export class ShareItemsDto {
  @ApiProperty({ name: 'mediaItems', type: () => MediaShareItemDto })
  mediaItems: MediaShareItemDto[];

  @ApiProperty({ name: 'playlists', type: () => PlaylistShareItemDto })
  playlists: PlaylistShareItemDto[];
}

export class ShareItemsIdsDto {
  @ApiProperty({ name: 'shareItemIds', type: () => String, isArray: true })
  shareItemIds: string[];
}

// TODO: Fix this type!
export class ShareItemsByUserIdDto {
  @ApiProperty({
    name: 'shareItemByUserIds',
    type: () => String,
    isArray: true,
  })
  shareItemByUserIds: any[];
  // shareItemByUserIds: UserConnectionDto[];
}
