import { KeyPair } from './keypair.entity';
import { TagInterface } from '@core-lib';
import { Entity, Index } from 'typeorm';

@Entity()
@Index('userId', { unique: false })
export class Tag extends KeyPair<string> implements TagInterface {}
