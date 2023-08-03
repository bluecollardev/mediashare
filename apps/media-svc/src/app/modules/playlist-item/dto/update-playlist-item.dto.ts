import { AutoMap } from '@automapper/classes';
import { ApiLongString, ApiString, ApiTextString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { MediaVisibilityType, MEDIA_VISIBILITY } from '../../../core/models';

export class UpdatePlaylistItemDto extends ApiBaseDto {
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  playlistId: string;

  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  mediaId: string;

  @IsDefined()
  @AutoMap()
  @ApiString({ required: true })
  userId: string;

  @IsOptional()
  @AutoMap()
  @ApiString({ required: true })
  createdBy?: string;

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

  @IsString()
  @AutoMap()
  @ApiLongString({ required: true })
  uri: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiLongString({ required: false })
  imageSrc?: string;

  @IsOptional()
  @IsInt()
  @AutoMap()
  @ApiProperty({ type: 'number', required: false })
  sortIndex?: number;

  @IsOptional()
  @IsBoolean()
  @AutoMap()
  @ApiProperty({ required: false })
  isPlayable?: boolean;

  @IsOptional()
  @IsIn(MEDIA_VISIBILITY)
  @AutoMap()
  // TODO: Make this required!
  @ApiProperty({ enum: MEDIA_VISIBILITY, name: 'visibility', enumName: 'MediaVisibilityType', required: false })
  visibility: MediaVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags?: any[]; // TagKeyValue[];
}
