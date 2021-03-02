import { ObjectId } from 'mongodb';
import { MediaItem } from '../entities/media-item.entity';
import { IsBoolean, IsIn, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiDefaults, MediaCategoryType, MEDIA_CATEGORY } from '@core-lib';

export class CreateMediaItemDto implements Pick<MediaItem, 'summary' | 'isPlayable' | 'description' | 'userId'> {
  @IsBoolean()
  @ApiProperty({ required: true })
  isPlayable: boolean;

  @IsString()
  @ApiProperty({ required: true })
  summary: string;

  @IsString()
  @MinLength(ApiDefaults.longString.min)
  @MaxLength(ApiDefaults.longString.max)
  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  userId: ObjectId;

  @IsString()
  @MinLength(ApiDefaults.longString.min)
  @MaxLength(ApiDefaults.longString.max)
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true, enum: MEDIA_CATEGORY })
  @IsIn(MEDIA_CATEGORY)
  category: MediaCategoryType;
}
