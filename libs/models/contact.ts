enum ContactTypes {
  Email,
  PhoneNumber,
  Address
}

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
