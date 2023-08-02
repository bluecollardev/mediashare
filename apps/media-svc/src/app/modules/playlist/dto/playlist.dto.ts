import { AutoMap } from '@automapper/classes';
import { MediaItemDto } from '../../media-item/dto/media-item.dto';
import { ApiDecoratorOptions, ApiLongString, ApiObjectId, ApiString, ApiTextString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsIn, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
// import { AuthorProfileDto } from '../user/dto/profile.dto';
import { PlaylistItemDto } from '../../playlist-item/dto/playlist-item.dto';
import { PLAYLIST_VISIBILITY, PlaylistVisibilityType } from '../../../core/models';

export class PlaylistDto {
  @IsDefined()
  @AutoMap()
  @ApiObjectId()
  _id: ObjectId;

  @IsOptional()
  @AutoMap()
  @ApiObjectId()
  cloneOf?: ObjectId;

  @IsString()
  @AutoMap()
  @ApiProperty({ required: true })
  @ApiString()
  title: string;

  @IsString()
  @AutoMap()
  @ApiProperty({ required: true })
  @ApiTextString()
  description: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiLongString(<ApiDecoratorOptions>{ required: true })
  imageSrc?: string;

  @IsIn(PLAYLIST_VISIBILITY)
  @AutoMap()
  @ApiProperty({ required: true, enum: PLAYLIST_VISIBILITY })
  visibility: PlaylistVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags: any[]; // TagKeyValue[];

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
