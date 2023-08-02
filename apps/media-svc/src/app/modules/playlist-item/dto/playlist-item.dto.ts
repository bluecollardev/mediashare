import { AutoMap } from '@automapper/classes';
import { ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { MEDIA_VISIBILITY, MediaVisibilityType } from '../../../core/models';
// import { AuthorProfileDto } from '../user/dto/profile.dto';

export class PlaylistItemDto extends ApiBaseDto {
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  playlistId: string;

  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  mediaId: string;

  @IsOptional()
  @IsInt()
  @AutoMap()
  @ApiProperty({ type: 'number', required: false })
  sortIndex?: number;

  @IsIn(MEDIA_VISIBILITY)
  @AutoMap()
  @ApiProperty({ enum: MEDIA_VISIBILITY, name: 'visibility', enumName: 'MediaVisibilityType', required: true })
  visibility: MediaVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags?: any[]; // TagKeyValue[];

  // @ApiProperty({ type: () => AuthorProfileDto })
  // authorProfile: AuthorProfileDto;

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
