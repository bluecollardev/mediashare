import { List, View, Text } from 'native-base';
import React, { ReactNode } from 'react';

import { StyleSheet } from 'react-native';
import { routeConfig } from '../../routes';
import { MediaItem, MediaItemDto } from '../../rxjs-api';
import { MediaListItem } from './MediaListItem';

interface MediaListProps {
  list: MediaItem[];
  onViewDetail: (item: MediaItem) => void;
  isSelectable: boolean;
}

function MediaList({ list, onViewDetail, isSelectable }: MediaListProps) {
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
