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
import { findMediaItems, toggleMediaItem } from '../../state/modules/media-items/index';

export interface AddFromProps {
  navigation: any;
  onViewDetail: () => void;
  items: MediaItem[];
}

export interface AddFromState {}

function AddFrom({ onViewDetail = () => {}, items }: AddFromProps) {
  const dispatch = useDispatch();

  function toggleField(id: number) {
    console.log(id);
    dispatch(toggleMediaItem(id));
    console.log(items[id]);
  }
  return (
    <List>
      <ListItemGroup key={'group1'} text={'Vimeo'} />
      {items.concat([]).map((item, idx) => {
        const { title, description, thumbnail } = item;
        return (
          <MediaListItem
            key={`item-${idx}`}
            title={title}
            description={description}
            image={thumbnail}
            checked={false}
            onChecked={() => toggleField(idx)}
            onViewDetail={onViewDetail}
          />
        );
      })}
    </List>
  );
}

export default AddFrom;
