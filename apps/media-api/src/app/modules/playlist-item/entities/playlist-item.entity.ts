import { BcBaseEntity } from '@api';
import { ApiObjectId } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';

@Entity()
export class PlaylistItem extends BcBaseEntity<PlaylistItem> {
  @Column({ unique: true })
  @ApiObjectId()
  mediaId: ObjectId;

  @Column()
  @ApiObjectId()
  userId: ObjectId;
}
