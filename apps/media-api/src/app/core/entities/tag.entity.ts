import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ApiString } from '@mediashare/shared';
import { KeyPair } from './keypair.entity';
import { TagInterface } from '@core-lib';
import { Column, Entity, Index } from 'typeorm';

@Entity('tags')
// TODO: Fix index
// @Index('key', { unique: true })
export class Tag extends KeyPair<string> implements TagInterface {
  @ApiString()
  @Column('key')
  key: string;

  @ApiString()
  @Column('value')
  value: string;

  @ApiProperty({ type: Boolean, nullable: true })
  @Column('isMediaTag')
  isMediaTag: boolean;

  @ApiProperty({ type: Boolean, nullable: true })
  @Column('isPlaylistTag')
  isPlaylistTag: boolean;

  @ApiProperty({ type: ObjectId, isArray: true, nullable: true })
  @Column({ name: 'parentIds', array: true, nullable: true })
  parentIds: ObjectId[];
}
