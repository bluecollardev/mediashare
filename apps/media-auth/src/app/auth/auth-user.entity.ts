import { hash } from 'bcrypt';
import { Min, IsEmail } from 'class-validator';
import { Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
