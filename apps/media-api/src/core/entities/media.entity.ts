import { BcBaseEntity } from '@api';
import { Column, Entity, ObjectID } from 'typeorm';
import { Stat } from './stat.entity';
import { Tag } from './tag.entity';

@Entity()
export class Media extends BcBaseEntity<Media> {
  @Column() displayFileName: string;

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
