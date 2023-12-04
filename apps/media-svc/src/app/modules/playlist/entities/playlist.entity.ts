import { AutoMap } from '@automapper/classes';
import { AutoMapOptions } from '@automapper/classes/lib/automap';
import { ApiProperty } from '@nestjs/swagger';
import { ApiString, ApiTextString } from '@mediashare/shared';
import { Column, Entity, Index } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';
// import { TagKeyValue } from '../tags/tags/tags-key-value.tags';
import {
  PlaylistVisibilityType,
  PLAYLIST_VISIBILITY,
} from '../../../core/models';

@Entity('playlist')
export class Playlist extends ApiBaseEntity {
  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @Column({ nullable: true })
  @Index('cloneOf', { unique: false })
  cloneOf?: ObjectId;

  @AutoMap()
  @Column({ nullable: true, type: 'text' })
  title: string;

  @AutoMap()
  @Column({ nullable: true, type: 'text' })
  description: string;

  @AutoMap()
  @Column({ nullable: true })
  imageSrc?: string;

  // @AutoMap()
  @Column('mediaIds')
  mediaIds: ObjectId[];

  @AutoMap()
  @Column({ nullable: true })
  visibility: PlaylistVisibilityType;

  @AutoMap()
  @Column({ name: 'tags', array: true, nullable: true })
  tags: any[]; // TagKeyValue[];
}
