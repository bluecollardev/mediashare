import * as React from 'react';
import { Button, Container, Content, Icon, List, Text, View } from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';
import { ListItemGroup } from '../../components/layout/ListItemGroup';

import { routeConfig } from '../../routes';
import styles from './styles';
import { useAppSelector } from '../../state/index';
import { MediaItem } from '../../rxjs-api';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { useDispatch } from 'react-redux';
import { toggleMediaItem } from '../../state/modules/media-items/index';

export interface AddFromProps {
  navigation: any;
}

export interface AddFromState {}

const AddFrom = (props: AddFromProps) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const items = useAppSelector((state) => state.mediaItems.mediaItems);
  return (
    <List>
      <ListItemGroup key={'group1'} text={'Vimeo'} />
      {items.map((item, idx) => {
        const { title, description, thumbnail, checked } = item;

        return (
          <MediaListItem
            key={`item-${idx}`}
            title={title}
            description={description}
            image={thumbnail}
            checked={checked}
            onChecked={(bool) => dispatch(toggleMediaItem(idx))}
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
