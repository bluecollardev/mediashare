import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import { MediaListItem } from './MediaListItem';
import { MediaItem, MediaItemDto } from '../../rxjs-api';

import { shortenText } from '../../utils';

export type MediaListType = Omit<Pick<MediaItemDto, keyof MediaItem>, 'category'>;

interface MediaListProps {
  list: MediaListType[];
  onViewDetail?: (item: MediaListType) => void;
  selectable?: boolean;
  showActions?: boolean;
  showThumbnail?: boolean;
  addItem?: (item?: MediaListType) => void;
  removeItem?: (item?: MediaListType) => void;
}

export const MediaList = ({
  list,
  onViewDetail,
  selectable,
  showThumbnail,
  showActions = true,
  addItem = () => {},
  removeItem = () => {},
}: MediaListProps) => {
  return (
    <View>
      {list.map((item, idx, arr) => {
        const { _id, title, description, thumbnail } = item;
        return (
          <View key={`item_${_id}`}>
            <MediaListItem
              title={title}
              description={`${shortenText(description, 40)}`}
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
