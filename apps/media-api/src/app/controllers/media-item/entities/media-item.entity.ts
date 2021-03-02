import { BcBaseEntity } from '@api';
import { Media, Stats } from '@core-lib';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { Tag } from '../../../core/entities/tag.entity';

@Entity()
export class MediaItem extends BcBaseEntity<MediaItem> implements Media {
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
  @Column()
  displayFileName: string;
  @Column()
  thumbnail?: string;
  @Column()
  uri: string;
  @Column()
  stats?: Stats;
}
