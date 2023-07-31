import { Entity } from 'typeorm';
import { KeyPair } from './keypair.entity';

@Entity('stat')
export class Stat extends KeyPair<string> {}
