import { List, View } from 'native-base';
import React from 'react';

import { StyleSheet } from 'react-native';
import { MediaItem } from '../../rxjs-api';
import { MediaListItem } from './MediaListItem';

interface MediaListProps {
  list: MediaItem[];
  onViewDetail: (item: MediaItem) => void;
  isSelectable: boolean;
  addItem?: (item?: MediaItem) => void;
  removeItem?: (item?: MediaItem) => void;
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
