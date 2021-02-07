import { ConfigEnum } from './configEnum';

export const ACCOUNT_TYPES = [
  'Email',
  'Google',
  'Facebook',
  'Instagram'
] as const;
export type AccountTypes = ConfigEnum<typeof ACCOUNT_TYPES>

export interface Account {
  id?: string;
  accountType?: Partial<AccountTypes>;
  // TODO: Other stuff here...
}
