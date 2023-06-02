import { hash } from 'bcrypt';
import { Min, IsEmail } from 'class-validator';
import { Entity, Unique, UpdateDateColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';

import { BcRolesType, BC_ROLES } from '@core-lib';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  authId: string;

  @Column()
  _id: string;

  @Column()
  username: string;

  @Column()
  @Min(8)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  isDisabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @Column('enum', { enum: BC_ROLES })
  roles: BcRolesType[];
}
