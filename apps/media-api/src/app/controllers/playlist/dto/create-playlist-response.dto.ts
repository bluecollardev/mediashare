import { ApiObjectId } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { Playlist } from '../entities/playlist.entity';
class CreatePlaylistItemResponseDto implements Pick<PlaylistItem, 'mediaId' | 'userId' | 'playlistId' | '_id'> {
  @ApiObjectId()
  mediaId: ObjectId;
  @ApiObjectId()
  userId: ObjectId;

  @ApiObjectId()
  playlistId: ObjectId;
  @ApiObjectId()
  _id: ObjectId;
}

class CreatePlaylistResponseDto {
  @ApiProperty({ readOnly: true, type: Playlist })
  playlist: Playlist;

  @ApiProperty({ type: CreatePlaylistItemResponseDto })
  playlistItems: CreatePlaylistItemResponseDto[];
}

export { Playlist, CreatePlaylistResponseDto };
