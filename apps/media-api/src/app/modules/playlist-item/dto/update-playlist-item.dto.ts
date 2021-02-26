import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { CreatePlaylistItemDto } from './create-playlist-item.dto';

export class UpdatePlaylistItemDto extends PartialType(CreatePlaylistItemDto) {
  @ApiProperty({ required: false })
  userId?: ObjectId;
  @ApiProperty({ required: false })
  playlistId?: ObjectId;
  @ApiProperty({ required: false })
  mediaId?: ObjectId;
}
