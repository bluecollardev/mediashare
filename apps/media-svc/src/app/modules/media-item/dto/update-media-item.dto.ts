import { AutoMap } from '@automapper/classes';
import { ApiString, ApiLongString, ApiTextString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { TagKeyValue } from '@mediashare/core/modules/tags/dto/tag-key-value.dto';
import { MediaVisibilityType, MEDIA_VISIBILITY } from '../../../core/models';

export class UpdateMediaItemDto extends ApiBaseDto {
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

  @IsIn(MEDIA_VISIBILITY)
  @AutoMap()
  @ApiProperty({
    enum: MEDIA_VISIBILITY,
    name: 'visibility',
    enumName: 'MediaVisibilityType',
    required: true,
  })
  visibility: MediaVisibilityType;

  @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags?: TagKeyValue[];

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiString({ required: false })
  eTag?: string;
}
