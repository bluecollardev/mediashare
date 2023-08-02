import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ApiString } from '@mediashare/shared';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { MEDIA_VISIBILITY, MediaVisibilityType } from '../../../core/models';

export class CreatePlaylistItemDto {
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
}
