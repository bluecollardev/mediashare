import { BcEntity } from '@api';
import { ApiDecoratorOptions, ApiObjectId, ApiString } from '@mediashare/shared';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class ShareItem extends BcEntity {
  @Column({ name: 'userId' })
  @ApiObjectId(<ApiDecoratorOptions>{ readOnly: true })
  @Index('userId', { unique: false })
  userId: ObjectId;

  @Column('playlistId')
  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @Column({ name: 'mediaId', unique: false })
  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  @Index('mediaId')
  mediaId: ObjectId;

  @Column({ name: 'read', unique: false })
  @IsBoolean()
  read: boolean;

  @Column({ name: 'title', unique: false })
  @ApiString()
  title: string;
}
