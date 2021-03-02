import { BcRolesType } from 'libs/core/src/lib/models/roles.enum';

export interface SessionUserInterface {
  authId: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  _id: string;
  roles: BcRolesType[];
}
