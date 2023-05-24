import { BcBaseEntity } from '@api-core/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { Stat } from './stat.entity';
import { Tag } from './tag.entity';

@Entity()
export class Media<T> extends BcBaseEntity<T> {
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
