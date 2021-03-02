import { Profile } from './profile.model';
import {
  Address,
  AddressContact,
  Contact,
  EmailContact,
  PhoneNumberContact,
} from './contact.model';

export interface User {
  id?: string;
  profile?: Profile;
  userName: string;
  accounts?: Account[];
  readonly primaryContact?:
    | typeof PhoneNumberContact
    | typeof AddressContact
    | typeof EmailContact; // Read-only, update via API only
  readonly primaryContactId?: string; // Read-only, update via API only

  /* FIXME: @bcdevlucas consider splitting these out.. */
  contacts?: Contact<string | Address>[];
}
