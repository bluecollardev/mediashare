import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ApiString, ApiLongString, ApiTextString, ApiUriString, ApiDecoratorOptions } from '@mediashare/shared';
import { IsIn } from 'class-validator';
import { MediaItem } from '../entities/media-item.entity';
import { MediaVisibilityType, MEDIA_VISIBILITY } from '../../../core/models';
import { TagKeyValue } from '../tag/dto/tag-key-value.dto';

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

  @ApiProperty({ required: true, enum: MEDIA_VISIBILITY })
  @IsIn(MEDIA_VISIBILITY)
  visibility: MediaVisibilityType;

  @ApiProperty({ type: () => TagKeyValue, required: false, isArray: true, nullable: true })
  tags: TagKeyValue[];

  @ApiString(<ApiDecoratorOptions>{ required: true })
  key: string;

  @ApiLongString(<ApiDecoratorOptions>{ required: true })
  imageSrc?: string;

  @ApiString()
  eTag?: string;
}

export class AdditionalMediaItemDto extends CreateMediaItemDto {
  @ApiString()
  displayFileName: string;

  @ApiUriString()
  imageSrc?: string;

  @ApiUriString()
  uri: string;
}
