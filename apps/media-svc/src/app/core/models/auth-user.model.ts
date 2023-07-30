import { BcRolesType } from '../types/roles.type';
import { ObjectId } from 'mongodb';

export interface SessionUserInterface {
  username: string;
  email: string;
  createdAt: Date;
  _id: ObjectId;
  roles: BcRolesType[];
}
