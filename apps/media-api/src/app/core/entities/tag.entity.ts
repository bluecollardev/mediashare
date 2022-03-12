import { TagInterface } from '@core-lib';
import { ObjectId } from 'mongodb';
import { ObjectIdColumn, Entity } from 'typeorm';
import { KeyPair } from './keypair.entity';

@Entity()
export class Tag extends KeyPair<string> implements TagInterface {
  @ObjectIdColumn()
  mediaId: ObjectId;

  @ObjectIdColumn()
  userId: ObjectId;
}
