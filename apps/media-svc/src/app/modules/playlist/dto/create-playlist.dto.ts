import { AutoMap } from '@automapper/classes';
import {
  ApiDecoratorOptions,
  ApiLongString,
  ApiObjectId,
  ApiString,
  ApiTextString,
} from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { PlaylistDto } from './playlist.dto';
import { PlaylistItemDto } from '../../playlist-item/dto/playlist-item.dto';
import { TagKeyValue } from '@mediashare/core/modules/tags/dto/tag-key-value.dto';
import {
  PLAYLIST_VISIBILITY,
  PlaylistVisibilityType,
} from '../../../core/models';

export class CreatePlaylistDto {
  @IsOptional()
  @AutoMap()
  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  cloneOf?: ObjectId;

  @IsDefined()
  @AutoMap()
  @ApiString({ required: true })
  userId: string;

  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  title: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiLongString({ required: false })
  summary?: string;

  @IsString()
  @AutoMap()
  @ApiTextString({ required: true })
  description: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiLongString({ required: false })
  imageSrc?: string;

  @ApiProperty({
    isArray: true,
    type: 'string',
    writeOnly: true,
    required: true,
  })
  @IsArray()
  mediaIds: ObjectId[];

  @IsIn(PLAYLIST_VISIBILITY)
  @AutoMap()
  @ApiProperty({
    enum: PLAYLIST_VISIBILITY,
    name: 'visibility',
    enumName: 'PlaylistVisibilityType',
    required: true,
  })
  visibility: PlaylistVisibilityType;

   @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags?: TagKeyValue[];
}

export class CreatePlaylistResponseDto extends PlaylistDto {
  @ApiProperty({ type: () => PlaylistItemDto, isArray: true })
  playlistItems: PlaylistItemDto[];
}
