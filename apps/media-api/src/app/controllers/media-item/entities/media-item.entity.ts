import { BcEntity } from '@api-core/entities/base.entity';
import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';
import { MediaCategoryType, MEDIA_CATEGORY, MEDIA_ITEM_ENTITY } from '@core-lib';
import { ApiObjectId, ApiString, ApiTextString, ApiLongString, ApiUriString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';
export const MEDIA_TOKEN = MEDIA_ITEM_ENTITY;

@Entity(MEDIA_TOKEN)
export class MediaItem extends BcEntity {
  constructor(props: Partial<MediaItem> = {}) {
    super();
    Object.assign(this as any, props);
  }

  @ApiObjectId()
  @Column({ nullable: false, unique: false })
  @Index('userId', { unique: false })
  userId: ObjectId;

  @Column({ nullable: true, type: 'text' })
  @ApiString()
  title: string;

  @Column({ nullable: true, type: 'text' })
  @ApiTextString()
  summary: string;

  @Column({ nullable: true, type: 'text' })
  @ApiLongString()
  description: string;

  @Column()
  @ApiUriString()
  uri: string;

  @Column({ nullable: true })
  @ApiString()
  thumbnail?: string;

  @Column({ nullable: true })
  @IsBoolean()
  @ApiProperty({ required: false })
  isPlayable: boolean;

  @Column({ nullable: true })
  @ApiProperty({ enum: MEDIA_CATEGORY, name: 'category', enumName: 'MediaCategoryType', required: false })
  category: MediaCategoryType;

  @ApiProperty({ type: TagKeyValue, isArray: true, nullable: true })
  @Column({ name: 'tags', array: true, nullable: true })
  tags: TagKeyValue[];
}
