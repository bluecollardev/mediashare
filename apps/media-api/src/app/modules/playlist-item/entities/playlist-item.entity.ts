import { MEDIA_ITEM_ENTITY } from '@core-lib';
// import { ApiObjectId, ObjectIdPipe } from '@mediashare/shared';
// import { Transform } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';
import { ApiObjectId } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';

export const MEDIA_TOKEN = MEDIA_ITEM_ENTITY;

@Entity(MEDIA_TOKEN)
export class PlaylistItem extends MediaItem {
  constructor(props: Partial<PlaylistItem> = {}) {
    super();
    Object.assign(this as any, props);
  }

  // TODO: Ask Sean what this transform is for, or investigate
  @ApiObjectId()
  // @Transform((string) => new ObjectIdPipe())
  @Column()
  @Index('mediaId')
  mediaId: ObjectId;

  @ApiObjectId()
  // @Transform((string) => new ObjectIdPipe())
  @Column({ nullable: false, unique: false })
  @Index('userId', { unique: false })
  userId: ObjectId;

  @ApiObjectId()
  // @Transform((string) => new ObjectIdPipe())
  @Column()
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @Column()
  sortIndex: number;
}
