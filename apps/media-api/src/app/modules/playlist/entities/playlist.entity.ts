import { ApiProperty } from '@nestjs/swagger';
import { ApiObjectId, ApiString, ApiTextString } from '@mediashare/shared';
import { Column, Entity, Index } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BcEntity } from '@api-core/entities/base.entity';
import { TagKeyValue } from '@api-modules/tag/dto/tag-key-value.dto';
import { PlaylistCategoryType, PlaylistInterface, PLAYLIST_CATEGORY } from '@core-lib';

@Entity('playlist')
export class Playlist extends BcEntity implements PlaylistInterface {
  @ApiObjectId()
  @Column({ nullable: false, unique: false })
  @Index('userId', { unique: false })
  userId: ObjectId;

  @Column({ nullable: true, type: 'text' })
  @ApiString()
  title: string;

  @Column({ nullable: true, type: 'text' })
  @ApiTextString()
  description: string;

  @Column({ nullable: true })
  @ApiString()
  imageSrc?: string;

  @Column('mediaIds')
  @ApiProperty({ type: String, isArray: true, nullable: true })
  mediaIds: ObjectId[];

  @Column({ nullable: true })
  @ApiProperty({ enum: PLAYLIST_CATEGORY, name: 'category', enumName: 'PlaylistCategoryType', required: false })
  category: PlaylistCategoryType;

  @ApiProperty({ type: () => TagKeyValue, isArray: true, nullable: true })
  @Column({ name: 'tags', array: true, nullable: true })
  tags: TagKeyValue[];
}
