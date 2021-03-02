import { BcBaseEntity } from '@api';
import { Stats, Tag, Video } from '@core-lib';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';
// import { Tag } from '../../../core/entities/tag.entity';

@Entity()
export class MediaItem extends BcBaseEntity<MediaItem> implements Video {
  @Column()
  isPlayable: boolean;
  @Column() summary: string;
  @Column() description: string;
  @Column() tags: Tag[];
  @Column() userId: ObjectId;
  @Column() title: string;
  @Column() displayName: string;
  displayFileName: string;
  thumbnail?: string;
  uri: string;
  constructor(props: Partial<MediaItem> = {}) {
    super();
    Object.assign(this);
  }
}
