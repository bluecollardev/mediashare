import { AutoMap } from '@automapper/classes';
import { AutoMapOptions } from '@automapper/classes/lib/automap';
import { IsIn } from 'class-validator';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { ApiBaseEntity } from '@mediashare/core/entities';

import { MEDIA_VISIBILITY, MediaVisibilityType } from '../../../core/models';

@Entity('playlist_item')
export class PlaylistItem extends ApiBaseEntity {
  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @ObjectIdColumn({ name: 'playlistId', nullable: false, unique: false })
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @ObjectIdColumn({ name: 'mediaId', nullable: false, unique: false })
  @Index('mediaId')
  mediaId: ObjectId;

  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @ObjectIdColumn({ name: 'userId', nullable: false, unique: false })
  @Index('userId', { unique: false })
  userId: ObjectId;

  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @ObjectIdColumn({ name: 'createdBy', nullable: true, unique: false })
  @Index('createdBy', { unique: false })
  createdBy: ObjectId;

  @AutoMap()
  @Column({ nullable: true })
  sortIndex?: number;

  @AutoMap()
  @Column({ nullable: true, type: 'text' })
  title: string;

  @AutoMap()
  @Column({ nullable: true, type: 'text' })
  summary?: string;

  @AutoMap()
  @Column({ nullable: true, type: 'text' })
  description: string;

  @AutoMap()
  @Column({ nullable: false })
  uri: string;

  @AutoMap()
  @Column({ nullable: true })
  imageSrc?: string;

  @AutoMap()
  @Column({ nullable: true })
  isPlayable?: boolean;

  @IsIn(MEDIA_VISIBILITY)
  // TODO: Change this to false once all data is updated!
  @Column({ nullable: true })
  visibility: MediaVisibilityType;

  /* @ApiProperty({ type: () => TagKeyValue, isArray: true, nullable: true })
  @Column({ name: 'tags', array: true, nullable: true })
  tags: TagKeyValue[]; */
}
