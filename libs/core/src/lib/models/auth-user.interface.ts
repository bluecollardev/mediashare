import { IdType } from '../types/id.type';

export interface AuthUserInterface {
  authId: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  _id: IdType;
}
