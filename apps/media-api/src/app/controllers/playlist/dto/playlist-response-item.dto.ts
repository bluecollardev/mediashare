import { BcEntity } from '@api-core/entities/base.entity';
import { ApiObjectId, ApiString } from '@mediashare/shared';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { PlaylistItem } from '@api-modules/playlist-item/entities/playlist-item.entity';
import { MediaItem } from '../../media-item/entities/media-item.entity';

class PlaylistItemCreatedBy extends BcEntity {
  @ApiString()
  username: string;
}
export class PlaylistItemResponseDto extends IntersectionType(OmitType(MediaItem, ['createdBy']), PlaylistItem) {
  @ApiObjectId()
  playlistItemId: ObjectId;
  // @ApiProperty({ type: () => PlaylistItemCreatedBy })
  // createdBy: PlaylistItemCreatedBy;
}
