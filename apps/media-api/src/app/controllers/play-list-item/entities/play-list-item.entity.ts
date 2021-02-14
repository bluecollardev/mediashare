import { BcBaseEntity } from '@api';
import { Column, Entity } from 'typeorm';

@Entity('playListitem')
export class PlayListItem extends BcBaseEntity<PlayListItem> {
  @Column() displayFileName: string;

  isPlayable;
  previewImagePath;
  uri;
  title;
  summary;
  description;
  tags;

  stats;
}
