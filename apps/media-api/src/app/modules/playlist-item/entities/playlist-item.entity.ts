// import { ApiObjectId, ObjectIdPipe } from '@mediashare/shared';
// import { Transform } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';
import { ApiObjectId } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { MediaItem } from '@api-modules/media-item/entities/media-item.entity';

@Entity('playlist_item')
export class PlaylistItem extends MediaItem {
  constructor(props: Partial<PlaylistItem> = {}) {
    super();
    Object.assign(this as any, props);
  }

  @ApiObjectId()
  // @Transform((string) => new ObjectIdPipe())
  @Column()
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

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

  @Column()
  sortIndex: number;
}
