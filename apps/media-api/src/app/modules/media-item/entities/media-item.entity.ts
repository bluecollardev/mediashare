import { ApiProperty } from '@nestjs/swagger';
import { ApiObjectId, ApiString, ApiTextString, ApiLongString, ApiUriString } from '@mediashare/shared';
import { IsBoolean } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BcEntity } from '@api-core/entities/base.entity';
import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';
import { MediaCategoryType, MEDIA_CATEGORY } from '@core-lib';

@Entity('media_item')
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
  @ApiTextString()
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

  @ApiProperty({ type: () => TagKeyValue, isArray: true, nullable: true })
  @Column({ name: 'tags', array: true, nullable: true })
  tags: TagKeyValue[];
}
