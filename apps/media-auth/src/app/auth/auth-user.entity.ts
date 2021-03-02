import { hash } from 'bcrypt';
import { Min, IsEmail } from 'class-validator';
import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';

import { AuthUserInterface } from '@core-lib';
import { bcRoles, BcRolesType, BC_ROLES } from 'libs/core/src/lib/models/roles.enum';

@Entity()
@Unique(['username'])
@Unique(['email'])
// @Unique(['_id'])
export class AuthUser implements AuthUserInterface {
  @PrimaryGeneratedColumn('uuid')
  authId: string;

  @Column()
  username: string;

  @Column()
  @Min(8)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  _id: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @Column({ type: 'array', default: [bcRoles.guest] })
  roles: BcRolesType[];
}
