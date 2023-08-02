import { AutoMap } from '@automapper/classes';
import { ApiDecoratorOptions, ApiObjectId } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';
import { PlaylistDto } from './playlist.dto';
import { PlaylistItemDto } from '../../playlist-item/dto/playlist-item.dto';
import { PLAYLIST_VISIBILITY, PlaylistVisibilityType } from '../../../core/models';
// import { TagKeyValue } from '../tag/dto/tag-key-value.dto';

export class CreatePlaylistDto {
  @IsOptional()
  @AutoMap()
  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  cloneOf?: ObjectId;

  @ApiProperty({ isArray: true, type: 'string', writeOnly: true, required: true })
  @IsArray()
  mediaIds: ObjectId[];

  @IsIn(PLAYLIST_VISIBILITY)
  @AutoMap()
  @ApiProperty({ enum: PLAYLIST_VISIBILITY, name: 'visibility', enumName: 'PlaylistVisibilityType', required: true })
  visibility: PlaylistVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags?: any[]; // TagKeyValue[];
}

export class CreatePlaylistResponseDto extends PlaylistDto {
  @ApiProperty({ type: () => PlaylistItemDto, isArray: true })
  playlistItems: PlaylistItemDto[];
}
