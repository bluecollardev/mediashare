enum AccountTypes {
  Email,
  Google,
  Facebook,
  Instagram
}

export interface Account {
  id?: string;
  accountType?: Partial<AccountTypes>;
  // TODO: Other stuff here...
}
