import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ApiString } from '@mediashare/shared';
import { KeyPair } from './keypair.entity';
import { TagInterface } from '@core-lib';
// TODO: Fix index
// import { Column, Entity, Index } from 'typeorm';
import { Column, Entity } from 'typeorm';

@Entity('tags')
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
