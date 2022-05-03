import { Entity } from 'typeorm';
import { BcBaseEntity } from '@api-core/entities/base.entity';

@Entity()
export class Profile extends BcBaseEntity<Profile> {}
