import { ObjectId } from 'bson';
import { CreateDtoType } from '../../../core/types/create-dto.type';
import { PlaylistItem } from '../entities/playlist-item.entity';

export class CreatePlaylistItemDto implements CreateDtoType<PlaylistItem> {
  userId: ObjectId;
  playlistId: ObjectId;
  mediaId: ObjectId;
}
