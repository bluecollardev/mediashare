import * as React from 'react';
import { View } from 'react-native';
import { MediaListItem } from './MediaListItem';
import { UserDto } from '../../rxjs-api';

export interface ContactListProps {
  navigation?: any;
  showGroups?: boolean;
  items?: UserDto[];
  onChecked?: (b, u) => void;
}

export const ContactListSelectable: React.FC<ContactListProps> = (props) => {
  let { items = [] } = props;

  return (
    <View>
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
    </View>
  );
};
