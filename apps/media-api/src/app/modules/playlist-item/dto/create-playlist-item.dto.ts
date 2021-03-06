import { ObjectIdPipe } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import { Transform } from 'class-transformer';
import { CreateDtoType } from '../../../core/types/create-dto.type';
import { PlaylistItem } from '../entities/playlist-item.entity';

export class CreatePlaylistItemDto implements CreateDtoType<PlaylistItem> {
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
