import { AutoMap } from '@automapper/classes';
import { ApiDecoratorOptions, ApiLongString, ApiObjectId, ApiString, ApiTextString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
// import { AuthorProfileDto } from '../user/dto/profile.dto';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { MediaItemDto } from '../../media-item/dto/media-item.dto';
import { PlaylistItemDto } from '../../playlist-item/dto/playlist-item.dto';
import { PLAYLIST_VISIBILITY, PlaylistVisibilityType } from '../../../core/models';

export class PlaylistDto extends ApiBaseDto {
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
  @ApiProperty({ enum: PLAYLIST_VISIBILITY, name: 'visibility', enumName: 'PlaylistVisibilityType', required: true })
  visibility: PlaylistVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags?: any[]; // TagKeyValue[];

  // @ApiProperty({ type: () => AuthorProfileDto })
  // authorProfile: AuthorProfileDto;

  @ApiProperty({ type: () => MediaItemDto, isArray: true })
  mediaItems: MediaItemDto[];

  @ApiProperty({ type: () => PlaylistItemDto, isArray: true })
  playlistItems: PlaylistItemDto[];

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
