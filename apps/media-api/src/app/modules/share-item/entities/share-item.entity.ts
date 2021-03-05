import { BcEntity } from '@api';
import { ApiObjectId, ApiString } from '@mediashare/shared';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity } from 'typeorm';

@Entity()
export class ShareItem extends BcEntity {
  @Column()
  @ApiObjectId({ readOnly: true })
  userId: ObjectId;

  @Column()
  @ApiObjectId({ required: false })
  playlistId?: ObjectId;

  @Column()
  @ApiObjectId({ required: false })
  mediaId?: ObjectId;

  @Column()
  @ApiObjectId({ readOnly: true })
  createdBy: ObjectId;

  @Column()
  @IsBoolean()
  read: boolean;

  @Column()
  @ApiString()
  title: string;
}
