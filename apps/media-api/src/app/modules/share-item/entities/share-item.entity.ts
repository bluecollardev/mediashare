import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';

@Entity()
export class ShareItem extends BcBaseEntity<ShareItem> {
  @Column()
  userId: ObjectId;

  @Column()
  playlistId?: ObjectId;

  @Column()
  mediaId?: ObjectId;

  @Column()
  createdBy: ObjectId;

  @Column()
  read: boolean;

  @Column()
  title: string;
}
