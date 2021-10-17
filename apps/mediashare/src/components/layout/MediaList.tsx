import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { MediaListItem } from './MediaListItem';
import { MediaItem, MediaItemDto } from '../../rxjs-api';

import { shortenText } from '../../utils';

export type MediaListType = Omit<Pick<MediaItemDto, keyof MediaItem>, 'category'>;

interface MediaListProps {
  list: MediaListType[];
  showActions?: boolean;
  showThumbnail?: boolean;
  addItem?: (item?: MediaListType) => void;
  removeItem?: (item?: MediaListType) => void;
  onViewDetail?: (item: MediaListType) => void;
  selectable?: boolean;
}

export const MediaList = ({
  list,
  showThumbnail,
  showActions = true,
  addItem = () => {},
  removeItem = () => {},
  selectable,
  onViewDetail = () => {},
}: MediaListProps) => {
  return (
    <View>
      {list.map((item, idx, arr) => {
        const { _id, title, description, thumbnail } = item;
        return (
          <View key={`item_${_id}`}>
            <MediaListItem
              title={title}
              description={
                <View>
                  <Text style={styles.description}>{shortenText(description, 52)}</Text>
                </View>
              }
              image={thumbnail}
              selectable={selectable}
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
  );
};

const styles = StyleSheet.create({
  description: {
    color: '#666666',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
});
