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

  // TODO: Remove this when done...
  const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

  return (
    <List>
      {showGroups && <ListItemGroup key={'group1'} text={'Sample Group'} />}
      {items.map((item, idx) => {
        // const { title, description, image } = item;
        return (
          <MediaListItem
            key={item._id}
            title={`${item.firstName} ${item.lastName}`}
            description={item.username}
            image={imageSrc}
            selectable={true}
            onChecked={(b) => props.onChecked(b, item)}
            // showActions={true}
          />
        );
      })}
    </List>
  );
};
