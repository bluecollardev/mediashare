import { BcEntity } from '@api';
import { MediaCategoryType, MEDIA_CATEGORY, MEDIA_ITEM_ENTITY } from '@core-lib';
import { ApiLongString, ApiObjectId, ApiString, ApiTextString, ApiUriString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';
export const MEDIA_TOKEN = MEDIA_ITEM_ENTITY;

@Entity(MEDIA_TOKEN)
export class MediaItem extends BcEntity {
  constructor(props: Partial<MediaItem> = {}) {
    super();
    Object.assign(this, props);
  }
  @Column()
  @IsBoolean()
  @ApiProperty({ required: true })
  isPlayable: boolean;

  @ApiObjectId()
  @Index('userId')
  @Column({ nullable: false, unique: false })
  userId: ObjectId;

  @Column({ nullable: true, type: 'text' })
  @ApiString()
  title: string;

  @Column()
  @ApiLongString()
  summary: string;

  @Column()
  @ApiTextString()
  description: string;

  @Column()
  @ApiUriString()
  uri: string;

  @Column()
  @ApiProperty({ enum: MEDIA_CATEGORY, name: 'category', enumName: 'MediaCategoryType' })
  category: MediaCategoryType;

  @Column()
  @ApiString()
  thumbnail?: string;
}
