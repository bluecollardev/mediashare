import { ObjectId } from 'mongodb'
import { ApiString } from '@mediashare/shared';
import { KeyPair } from './keypair.entity';
import { TagInterface } from '@core-lib';
import { Column, Entity, Index } from 'typeorm';

@Entity('tags')
// TODO: Fix index
// @Index('key', { unique: true })
export class Tag extends KeyPair<string> implements TagInterface {
  @Column('key')
  @ApiString()
  key: string;
  @Column('value')
  @ApiString()
  value: string;
  @Column('isMediaTag')
  isMediaTag: boolean;
  @Column('isPlaylistTag')
  isPlaylistTag: boolean;
  @Column({ name: 'parentIds', array: true, nullable: true })
  parentIds: ObjectId[];
}
