import { ApiProperty } from '@nestjs/swagger';

import { IsArray } from 'class-validator';
import { ObjectId } from 'mongodb';
import { PlaylistDto } from './playlist.dto';
import { PlaylistItemDto } from '../../playlist-item/dto/playlist-item.dto';
// import { TagKeyValue } from '../tag/dto/tag-key-value.dto';

export class CreatePlaylistDto extends PickType(Playlist, ['visibility', 'title', 'description', 'imageSrc', 'mediaIds', 'cloneOf']) {
  @ApiProperty({ isArray: true, type: 'string', writeOnly: true, required: true })
  @IsArray()
  mediaIds: ObjectId[];

  // @ApiProperty({ type: () => TagKeyValue, isArray: true, nullable: true })
  tags: any[]; // TagKeyValue[];
}

export class CreatePlaylistResponseDto extends PlaylistDto {
  @ApiProperty({ type: () => PlaylistItemDto, isArray: true })
  playlistItems: PlaylistItemDto[];
}
