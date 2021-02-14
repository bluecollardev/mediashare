import { BcBaseEntity } from '@api';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Stat } from './stat.entity';
import { Tag } from './tag.entity';

@Entity('playListitem')
export class Media extends BcBaseEntity<Media> {
  @Column() displayFileName: string;

  @ObjectIdColumn()
  userId: ObjectID;

  @Column()
  imageUri: string;

  @Column()
  uri: string;

  @Column()
  title: string;

  @Column()
  tags: Tag[];

  @Column()
  stats: Stat[];
}
