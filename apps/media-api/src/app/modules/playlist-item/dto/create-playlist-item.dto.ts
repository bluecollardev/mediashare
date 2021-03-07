import { ObjectIdPipe } from '@mediashare/shared';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { Transform } from 'class-transformer';
import { PlaylistItem } from '../entities/playlist-item.entity';

export class CreatePlaylistItemDto extends OmitType(PlaylistItem, ['_id', 'sortIndex']) {
  @ApiProperty({ required: true })
  @Transform((string) => new ObjectIdPipe())
  userId: ObjectId;
  @ApiProperty({ required: true })
  @Transform((string) => new ObjectIdPipe())
  playlistId: ObjectId;
  @ApiProperty({ required: true })
  @Transform((string) => new ObjectIdPipe())
  mediaId: ObjectId;
}
