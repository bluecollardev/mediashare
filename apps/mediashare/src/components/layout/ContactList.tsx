import React from 'react';
import { UserDto } from '../../rxjs-api';
import ContactListItem from './ContactListItem';
import * as R from 'remeda';
import { List } from 'react-native-paper';

export interface ContactListProps {
  navigation?: any;
  contacts?: UserDto[];
  showGroups?: boolean;
  showActions?: boolean;
  selectable?: boolean;
  onClick?: (userId) => void;
  listItemProps?: any;
}

export const ContactList: React.FC<ContactListProps> = ({ contacts = [], onClick = () => {} }) => {
  console.log(contacts);
  const mappedAndKeyed = R.values(R.groupBy(contacts, (user) => (user?.firstName ? user.firstName[0].toUpperCase() : user.username[0].toUpperCase())));
  console.log('🚀 ---------------------------------------------------------------------');
  console.log('🚀 ~ file: ContactList.tsx ~ line 32 ~ mappedAndKeyed', mappedAndKeyed);
  console.log('🚀 ---------------------------------------------------------------------');
  console.log('🚀 ~ file: ContactList.tsx ~ line 32 ~ mappedAndKeyed', mappedAndKeyed);
  // const stepped = R.pipe(
  //   R.values(mappedAndKeyed),
  //   R.sort((a, b) => R.first(a).firstName[0].localeCompare(R.first(b).firstName[0]))
  // );

  return (
    <>
      {mappedAndKeyed.map((section) => {
        return (
          <List.Section>
            {section.map((item, i) => {
              return (
                <ContactListItem
                  title={`${item.firstName} ${item.lastName}`}
                  description={item.username}
                  avatar={item.imageSrc}
                  showLetterLabel={!i}
                  userId={item._id}
                  onClick={onClick}
                />
              );
            })}
          </List.Section>
        );
      })}
    </>
  );
};
