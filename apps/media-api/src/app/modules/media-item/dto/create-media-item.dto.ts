import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ApiString, ApiLongString, ApiTextString, ApiUriString, ApiDecoratorOptions } from '@mediashare/shared';
import { IsIn } from 'class-validator';
import { MediaItem } from '../entities/media-item.entity';
import { MediaCategoryType, MEDIA_CATEGORY } from '@core-lib';
import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';

const OPTIONAL_MEDIA_DTO_KEYS = ['_id', 'createdAt', 'updatedDate', 'userId', 'createdBy'] as const;

export class CreateMediaItemDto extends OmitType(MediaItem, [...OPTIONAL_MEDIA_DTO_KEYS]) {
  @ApiProperty({ required: true })
  @ApiString()
  title: string;

  @ApiProperty({ required: true })
  @ApiLongString()
  summary: string;

  @ApiProperty({ required: true })
  @ApiTextString()
  description: string;

  @ApiProperty({ required: true, enum: MEDIA_CATEGORY })
  @IsIn(MEDIA_CATEGORY)
  category: MediaCategoryType;

  @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags: TagKeyValue[];

  @ApiString(<ApiDecoratorOptions>{ required: true })
  key: string;

  @ApiLongString(<ApiDecoratorOptions>{ required: true })
  thumbnail?: string;

  @ApiString()
  eTag?: string;
}

export class AdditionalMediaItemDto extends CreateMediaItemDto {
  @ApiString()
  displayFileName: string;

  @ApiUriString()
  thumbnail?: string;

  @ApiUriString()
  uri: string;
}
