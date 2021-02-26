import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { CreateDtoType } from '../../../core/types/create-dto.type';
import { PlaylistItem } from '../entities/playlist-item.entity';

export class CreatePlaylistItemDto implements CreateDtoType<PlaylistItem> {
  @ApiProperty({ required: true })
  userId: ObjectId;
  @ApiProperty({ required: true })
  playlistId: ObjectId;
  @ApiProperty({ required: true })
  mediaId: ObjectId;
}
