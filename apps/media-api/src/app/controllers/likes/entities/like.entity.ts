import { ApiObjectId } from '@mediashare/shared';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';
import { BcEntity } from '../../../core/entities/base.entity';

@Entity('like_item')
export class Like extends BcEntity {
  @Column({ nullable: true })
  @ApiObjectId()
  playlistId?: ObjectId;

  @Column({ nullable: true })
  @ApiObjectId()
  mediaId?: ObjectId;
}
