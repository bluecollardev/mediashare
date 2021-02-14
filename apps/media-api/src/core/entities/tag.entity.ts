import { Column, Entity } from 'typeorm';
import { KeyPair } from './keypair.entity';

@Entity('tag')
export class Tag extends KeyPair<string> {}
