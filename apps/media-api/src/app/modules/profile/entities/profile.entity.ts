import { Entity } from 'typeorm';
import { BcBaseEntity } from '@api-core/entities/base.entity';

@Entity('profile')
export class Profile extends BcBaseEntity<Profile> {}
