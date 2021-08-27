import { List, View } from 'native-base';
import React from 'react';

import { StyleSheet } from 'react-native';
import { MediaItem } from '../../rxjs-api';
import { MediaListItem } from './MediaListItem';
import { MediaItemDto } from '../../rxjs-api/models/MediaItemDto';

interface MediaListProps {
  list: MediaItemDto[];
  onViewDetail: (item: MediaItemDto) => void;
  isSelectable: boolean;
  addItem?: (item?: MediaItemDto) => void;
  removeItem?: (item?: MediaItemDto) => void;
}

function MediaList({ list, onViewDetail, isSelectable, addItem = () => {}, removeItem = () => {} }: MediaListProps) {
  return (
    <View>
      <List>
        {list.map((item, idx) => {
          const { title, description, thumbnail } = item;
          return (
            <MediaListItem
              key={`item-${idx}`}
              title={title}
              description={description}
              image={thumbnail}
              selectable={isSelectable}
              onChecked={(v) => (v ? addItem(item) : removeItem(item))}
              onViewDetail={() => onViewDetail(item)}
            />
          );
        })}
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});

export default MediaList;
