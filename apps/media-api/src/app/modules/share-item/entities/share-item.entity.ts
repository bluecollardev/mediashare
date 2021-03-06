import { BcEntity } from '@api';
import { ApiObjectId, ApiString } from '@mediashare/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, isNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index, Check } from 'typeorm';

@Entity()
export class ShareItem extends BcEntity {
  @Column({ name: 'userId' })
  @ApiObjectId({ readOnly: true })
  @Index('userId')
  userId: ObjectId;

  @Column({ name: 'playlistId' })
  @ApiObjectId({ required: false })
  @Index('playlistId')
  playlistId: ObjectId;

  @Column({ name: 'mediaId' })
  @ApiObjectId({ required: false })
  @Index('mediaId')
  mediaId: ObjectId;

  @Column({ name: 'createdBy' })
  @ApiObjectId({ readOnly: true })
  @Index('createdBy')
  createdBy: ObjectId;

  @Column({ name: 'read' })
  @IsBoolean()
  @Index()
  read: boolean;

  @Column({ name: 'title' })
  @ApiString()
  @Index()
  title: string;
}
