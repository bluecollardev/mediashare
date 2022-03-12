import { Entity } from 'typeorm';
import { BcBaseEntity } from '@api';

@Entity()
export class Profile extends BcBaseEntity<Profile> {}
