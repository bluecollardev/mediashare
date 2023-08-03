import { ApiProperty } from '@nestjs/swagger';
import { ApiString, ApiTextString } from '@mediashare/shared';
import { Column, Entity, Index } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';
// import { TagKeyValue } from '../tag/dto/tag-key-value.dto';
import { PlaylistVisibilityType, PLAYLIST_VISIBILITY } from '../../../core/models';

@Entity('playlist')
export class Playlist extends ApiBaseEntity {

  @Column({ nullable: true })
  @Index('cloneOf', { unique: false })
  cloneOf?: ObjectId;

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
  @ApiProperty({ enum: PLAYLIST_VISIBILITY, name: 'visibility', enumName: 'PlaylistVisibilityType', required: false })
  visibility: PlaylistVisibilityType;

  // @ApiProperty({ type: () => TagKeyValue, isArray: true, nullable: true })
  @Column({ name: 'tags', array: true, nullable: true })
  tags: any[]; // TagKeyValue[];
}
