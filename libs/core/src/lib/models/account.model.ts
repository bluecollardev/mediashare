import { ConfigEnum } from '../types/configEnum.type';

export const ACCOUNT_TYPES = [
  'Email',
  'Google',
  'Facebook',
  'Instagram',
] as const;
export type AccountType = ConfigEnum<typeof ACCOUNT_TYPES>;

export interface Account {
  id?: string;
  accountType?: AccountType;
  uid: string;
  // TODO: Other stuff here...
}
