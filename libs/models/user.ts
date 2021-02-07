import { Profile } from './profile';
import { Account } from './account';
import { Contact } from './contact';

export interface User {
  id?: string;
  profile?: Profile;
  accounts?: Account[];
  readonly primaryContact?: Contact; // Read-only, update via API only
  readonly primaryContactId?: string; // Read-only, update via API only
  contacts?: Contact[];
}
