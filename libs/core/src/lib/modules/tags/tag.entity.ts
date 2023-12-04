import { ApiProperty } from '@nestjs/swagger';
import { ApiString } from '@mediashare/shared';
import { Column, Entity } from 'typeorm';
import { ObjectId } from 'mongodb';
import { KeyPair } from '../../entities/keypair.entity';
import { TagInterface } from './tag.interface';

@Entity('tags')
// TODO: Fix index
// @Index('key', { unique: true })
export class Tag extends KeyPair<string> implements TagInterface {
  @ApiString()
  @Column('key')
  override key: string;

  @ApiString()
  @Column('value')
  override value: string;

  @ApiProperty({ type: String, nullable: true })
  @Column('imageSrc')
  imageSrc: string;

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
