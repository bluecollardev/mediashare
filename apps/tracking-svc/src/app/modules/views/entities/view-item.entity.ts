import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';
import { ApiObjectId } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';

@Entity('view_item')
export class ViewItem extends ApiBaseEntity {
  @Column('playlistId')
  @ApiObjectId({ required: false })
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @Column({ name: 'mediaId', unique: false })
  @ApiObjectId({ required: false })
  @Index('mediaId')
  mediaId: ObjectId;
}
