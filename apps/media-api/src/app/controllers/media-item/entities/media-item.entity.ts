import { Media } from 'apps/media-api/src/core/entities/media.entity';
import { Tag } from 'apps/media-api/src/core/entities/tag.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MediaItem extends Media {
  @Column()
  isPlayable: boolean;
  @Column() summary: string;
  @Column() description: string;
  @Column() tags: Tag[];
}
