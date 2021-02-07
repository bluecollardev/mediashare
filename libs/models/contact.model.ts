import { Constructor } from 'react-native';
import { ConfigEnum } from '../types/configEnum.type';

export const CONTACT_TYPES = ['Email', 'PhoneNumber', 'Address'] as const;

export type ContactType = ConfigEnum<typeof CONTACT_TYPES>;

export interface Address {
  id?: string;
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
}

export interface Contact<T extends string | Address> {
  id?: string;
  contactType?: ContactType;

  formatPattern?: string;
  value: T;
}

export class Contact<T> {
  constructor(
    opts?: Partial<Pick<Contact<T>, 'id' | 'formatPattern' | 'value'>>
  ) {
    const { id = null, formatPattern = null, value = null } = opts;

    this.id = id;
    this.formatPattern = formatPattern;
    this.value = value;
  }
}

function ContactMixin<T extends Constructor<Contact<string | Address>>>(
  type: ContactType,

  Base: T
) {
  class PhoneNumberContact extends Base {
    value: string;
    contactType = type;
    constructor(...args) {
      super(args);
    }
  }

  class EmailContact extends Base {
    value: string;
    contactType = type;
    constructor(...args) {
      super(args);
    }
  }

  class AddressContact extends Base {
    value: Address;
    contactType = type;

    constructor(...args) {
      super(args);
    }
  }

  if (type === 'PhoneNumber') return PhoneNumberContact;
  if (type === 'Email') return EmailContact;
  if (type === 'Address') return AddressContact;
}

const PhoneNumberContact = ContactMixin('PhoneNumber', Contact);

const EmailContact = ContactMixin('Email', Contact);

const AddressContact = ContactMixin('Address', Contact);

export { PhoneNumberContact, EmailContact, AddressContact };
