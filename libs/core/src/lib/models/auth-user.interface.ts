import { IdType } from '../types/id.type';
import { BcRolesType } from './roles.enum';

export interface AuthUserInterface {
  authId: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  _id: IdType;
  roles: BcRolesType[];
}
