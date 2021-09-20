import React from 'react';
import { Content, View } from 'native-base';
import { StyleSheet } from 'react-native';

import { MediaListItem } from './MediaListItem';
import { MediaItem, MediaItemDto } from '../../rxjs-api';
import { Divider } from 'react-native-paper';
import { shortenText } from '../../utils';

export type MediaListType = Omit<Pick<MediaItemDto, keyof MediaItem>, 'category'>;

interface MediaListProps {
  list: MediaListType[];
  onViewDetail?: (item: MediaListType) => void;
  isSelectable?: boolean;
  showActions?: boolean;
  showThumbnail?: boolean;
  addItem?: (item?: MediaListType) => void;
  removeItem?: (item?: MediaListType) => void;
}

export const MediaList = ({ list, onViewDetail, isSelectable, showThumbnail, showActions = true, addItem = () => {}, removeItem = () => {} }: MediaListProps) => {
  return (
    <Content>
      <View>
        {list.map((item, idx, arr) => {
          const { _id, title, description, thumbnail } = item;
          return (
            <View key={`item_${_id}`}>
              <MediaListItem
                title={title}
                description={`${shortenText(description, 40)}`}
                image={thumbnail}
                selectable={isSelectable}
                showThumbnail={showThumbnail}
                showActions={showActions}
                onChecked={(v) => (v ? addItem(item) : removeItem(item))}
                onViewDetail={() => onViewDetail(item)}
              />
              {idx !== arr.length && <Divider />}
            </View>
          );
        })}
      </View>
    </Content>
  );
};

export const styles = StyleSheet.create({
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
