import { BcRolesType } from 'libs/core/src/lib/models/roles.enum';
import { ObjectId } from 'mongodb';

export interface SessionUserInterface {
  username: string;
  email: string;
  createdAt: Date;
  _id: ObjectId;
  roles: BcRolesType[];
}
