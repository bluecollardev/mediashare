import { ApiObjectId } from '@mediashare/shared';
import { IntersectionType, OmitType } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';

export class PlaylistItemResponseDto extends IntersectionType(OmitType(MediaItem, ['createdBy']), PlaylistItem) {
  @ApiObjectId()
  playlistItemId: ObjectId;
}
