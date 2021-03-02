import { ObjectId } from 'mongodb';
import { ObjectIdColumn, Entity } from 'typeorm';
import { KeyPair } from './keypair.entity';

@Entity()
export class Tag implements Tag {
  @ObjectIdColumn()
  mediaId: ObjectId;

  @ObjectIdColumn()
  userId: ObjectId;
}
