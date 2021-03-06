import { ApiObjectId } from '@mediashare/shared';
import { IntersectionType } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { PlaylistItem } from '../../../modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../../media-item/entities/media-item.entity';

export class PlaylistItemResponseDto extends IntersectionType(PlaylistItem, MediaItem) {
  @ApiObjectId()
  playlistItemId: ObjectId;
}
