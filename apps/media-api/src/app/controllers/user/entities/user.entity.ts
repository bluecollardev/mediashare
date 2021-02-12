import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column() username: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
