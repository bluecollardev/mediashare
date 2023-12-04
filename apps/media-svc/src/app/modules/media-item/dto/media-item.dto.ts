import { AutoMap } from '@automapper/classes';
import { ApiLongString, ApiString, ApiTextString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { MediaVisibilityType, MEDIA_VISIBILITY } from '../../../core/models';
// import { AuthorProfileDto } from '../user/tags/profile.tags';

export class MediaItemDto extends ApiBaseDto {
  @IsString()
  @AutoMap()
  @ApiString({ required: true })
  key: string;

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
  @IsBoolean()
  @AutoMap()
  @ApiProperty({ required: false })
  isPlayable?: boolean;

  @IsIn(MEDIA_VISIBILITY)
  @AutoMap()
  @ApiProperty({ required: true, enum: MEDIA_VISIBILITY })
  visibility: MediaVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags?: any[]; // TagKeyValue[];

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiString({ required: false })
  eTag?: string;

  // TODO: Fix this type!
  // @ApiProperty({ type: () => AuthorProfileDto })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // @ApiProperty({ type: () => {} })
  // authorProfile: AuthorProfileDto;
  // authorProfile: any;

  @ApiProperty({ type: 'number' })
  shareCount?: number;

  @ApiProperty({ type: 'number' })
  viewCount?: number;

  @ApiProperty({ type: 'number' })
  likesCount?: number;
}
