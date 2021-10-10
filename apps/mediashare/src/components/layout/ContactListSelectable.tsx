import * as React from 'react';
import { List } from 'native-base';
import { ListItemGroup } from './ListItemGroup';
import { MediaListItem } from './MediaListItem';
import { UserDto } from '../../rxjs-api/models/UserDto';

export interface ContactListProps {
  navigation?: any;
  showGroups?: boolean;
  items?: UserDto[];
  onChecked?: (b, u) => void;
}

export const ContactListSelectable: React.FC<ContactListProps> = (props) => {
  let { items = [], showGroups = false } = props;

  return (
    <List>
      {showGroups && <ListItemGroup key={'group1'} text={'All Contacts'} />}
      {items.map((item) => {
        // const { title, description, image } = item;
        return (
          <MediaListItem
            key={item._id}
            title={`${item.firstName} ${item.lastName}`}
            description={item.username}
            image={item.imageSrc}
            showThumbnail={true}
            selectable={true}
            showActions={false}
            onChecked={(b) => props.onChecked(b, item)}
            // showActions={true}
          />
        );
      })}
    </List>
  );
};
