import { ConfigEnum } from './configEnum';

export const CONTACT_TYPES = [
  'Email',
  'PhoneNumber',
  'Address'
] as const;
export type ContactTypes = ConfigEnum<typeof CONTACT_TYPES>

export interface Address {
  id?: string;
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
}

export interface Contact {
  id?: string;
  contactType?: Partial<ContactTypes>;
  value?: string | Address
  formatPattern?: string;
}
