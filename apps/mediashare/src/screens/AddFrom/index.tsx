import * as React from 'react';
import { Button, Container, Content, Icon, List, Text, View } from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';
import { ListItemGroup } from '../../components/layout/ListItemGroup';

import { routeConfig } from '../../routes';
import styles from './styles';
import { useAppSelector } from '../../state/index';
import { MediaItem } from '../../rxjs-api';

export interface AddFromProps {
  navigation: any;
  list: Map<string, MediaItem & { checked: boolean }>;
}

export interface AddFromState {}

const AddFrom = (props: AddFromProps) => {
  const { navigation } = props;
  const items = useAppSelector((state) => state.mediaItems.mediaItems);
  console.log(items);
  return (
    <List>
      <ListItemGroup key={'group1'} text={'Vimeo'} />
      {items.map((item, idx) => {
        const { title, description, thumbnail } = item;

        return (
          <MediaListItem
            key={`item-${idx}`}
            title={title}
            description={description}
            image={thumbnail}
            onViewDetail={() => {
              navigation.navigate(routeConfig.libraryItemDetail.name);
            }}
          />
        );
      })}
    </List>
  );
};

export default AddFrom;
