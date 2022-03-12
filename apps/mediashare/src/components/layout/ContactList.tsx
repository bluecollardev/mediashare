import React from 'react';
import * as R from 'remeda';
import { NonEmptyArray } from 'remeda/dist/commonjs/_types';
import { UserDto } from '../../rxjs-api';
import { List } from 'react-native-paper';
import { ContactListItem } from './ContactListItem';

export interface ContactListProps {
  navigation?: any;
  contacts?: UserDto[];
  showActions?: boolean;
  showGroups?: boolean;
  onViewDetail?: (userId) => void;
  onChecked?: (bool: boolean, userId: string) => void;
  selectable?: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts = [],
  selectable,
  onChecked = () => undefined,
  showActions, onViewDetail = () => undefined,
}) => {
  const namedContacts = contacts.filter((user) => !!user.firstName || !!user.lastName);
  const unnamedContacts = contacts.filter((user) => !user.firstName && !user.lastName);
  const mappedAndKeyed = R.values(
    R.groupBy(namedContacts, (user) => (user?.firstName ? user.firstName[0].toUpperCase() : user.username[0].toUpperCase()))
  ).sort((a, b) => {
    try {
      return a[0]?.firstName?.localeCompare(b[0]?.firstName[0] ?? b[0]?.username[0]);
    } catch (err) {
      console.log(err);
    }
  });

  if (unnamedContacts.length > 0) {
    mappedAndKeyed.push(unnamedContacts as NonEmptyArray<UserDto>);
  }

  return (
    <>
      {mappedAndKeyed.map((section, idx) => {
        return (
          <List.Section key={`section_${idx}`}>
            {section.map((item, idx) => {
              const { firstName, lastName } = item;
              const fullName = firstName || lastName ? `${firstName} ${lastName}` : 'Unnamed User';
              return (
                <ContactListItem
                  key={`contact_${item._id}`}
                  title={fullName}
                  description={item.username}
                  avatar={item.imageSrc}
                  showLetterLabel={!idx && (!!firstName || !!lastName)}
                  userId={item._id}
                  selectable={selectable}
                  onChecked={onChecked}
                  onViewDetail={onViewDetail}
                  showActions={!selectable && showActions}
                />
              );
            })}
          </List.Section>
        );
      })}
    </>
  );
};
