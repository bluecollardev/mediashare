import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Playlist } from '../entities/playlist.entity';
export class CreatePlaylistDto extends PickType(Playlist, ['category', 'title', 'createdBy']) {
  @ApiProperty({ isArray: true, type: 'string', writeOnly: true, required: true })
  @IsArray()
  mediaIds: Readonly<string[]>;

  userId: ObjectId;
}
