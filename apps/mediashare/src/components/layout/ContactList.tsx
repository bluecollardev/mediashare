import React from 'react';
import { List } from 'native-base';
import { ListItemGroup } from './ListItemGroup';
import { MediaListItem } from './MediaListItem';

export interface ContactListProps {
  navigation?: any;
  showGroups?: boolean;
  items?: any[];
}

export const ContactList: React.FC<ContactListProps> = (props) => {
  let { items = [], showGroups = false } = props;

  // TODO: Remove this when done...
  const imageSrc =
    'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';
  items = [
    { title: 'John Doe', description: 'john.doe@example.com', image: imageSrc },
    { title: 'Jane Smith', description: 'jane.smith@example.com', image: imageSrc },
    { title: 'Jennifer Hawthorne', description: 'jenniferhaw@example.com', image: imageSrc }
  ];

  return (
    <List>
      {showGroups && (
        <ListItemGroup key={'group1'} text={'Sample Group'} />
      )}
      {items.map((item, idx) => {
        const { title, description, image } = item;
        return (
          <MediaListItem
            key={`item-${idx}`}
            title={title}
            description={description}
            image={image}
            selectable={false}
            // showActions={true}
          />
        );
      })}
    </List>
  );
};
