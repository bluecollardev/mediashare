import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { MediaListItem } from './MediaListItem';
import { MediaItemDto } from '@app/rxjs-api';

import { shortenText } from '@app/utils';

export type MediaListType = MediaItemDto;

import { theme } from '@app/styles';

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
              titleStyle={defaultStyles.titleText}
              description={
                <>
                  <Text style={defaultStyles.description}>{shortenText(description || '', 80)}</Text>
                </>
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

const defaultStyles = StyleSheet.create({
  titleText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  description: {
    color: theme.colors.textDarker,
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
});
