import { AutoMap } from '@automapper/classes';
import { PlaylistItemDto } from '../../playlist-item/dto/playlist-item.dto';
import {
  ApiDecoratorOptions,
  ApiLongString,
  ApiObjectId,
  ApiString,
  ApiTextString,
} from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { ObjectId } from 'mongodb';
import { TagKeyValue } from '@mediashare/core/modules/tags/dto/tag-key-value.dto';
import {
  PlaylistVisibilityType,
  PLAYLIST_VISIBILITY,
} from '../../../core/models';

export class UpdatePlaylistDto extends ApiBaseDto {
  @IsOptional()
  @AutoMap()
  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  cloneOf?: ObjectId;

  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  title: string;

  @IsString()
  @AutoMap()
  @ApiTextString({ required: true })
  description: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiLongString({ required: true })
  imageSrc?: string;

  @IsIn(PLAYLIST_VISIBILITY)
  @AutoMap()
  @ApiProperty({
    enum: PLAYLIST_VISIBILITY,
    name: 'visibility',
    enumName: 'PlaylistVisibilityType',
    required: true,
  })
  visibility: PlaylistVisibilityType;

  @ApiProperty({
    type: () => TagKeyValue,
    required: false,
    isArray: true,
    nullable: true,
  })
  tags?: TagKeyValue[];

  @ApiProperty({ type: () => String, isArray: true })
  mediaIds: string[];

  @ApiProperty({ type: () => PlaylistItemDto, isArray: true })
  playlistItems: PlaylistItemDto[];
}
