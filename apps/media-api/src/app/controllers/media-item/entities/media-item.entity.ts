import { BcBaseEntity } from '@api';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { Tag } from '../../../core/entities/tag.entity';

@Entity()
export class MediaItem extends BcBaseEntity<MediaItem> {
  @Column()
  isPlayable: boolean;
  @Column() summary: string;
  @Column() description: string;
  @Column() tags: Tag[];
  @Column() userId: ObjectId;
  @Column() title: string;
  constructor(props: Partial<MediaItem> = {}) {
    super();
    Object.assign(this);
  }
}
