import { Entity, Index } from 'typeorm';
import { TagInterface } from '@core-lib';
import { KeyPair } from '@api'

@Entity()
@Index('userId', { unique: false })
export class Tag extends KeyPair<string> implements TagInterface {}
