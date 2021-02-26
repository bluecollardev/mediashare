import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Playlist extends BcBaseEntity<Playlist> {
  @Column()
  title: string;

  @ObjectIdColumn()
  userId: ObjectId;

  @ObjectIdColumn({ array: true })
  items: ObjectId[];
}
