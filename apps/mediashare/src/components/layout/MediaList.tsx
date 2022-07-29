import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { MediaListItem } from './MediaListItem';
// import { shortenText } from 'mediashare/utils';

// TODO: Fix this!!
export type MediaListType = any;

import { theme } from 'mediashare/styles';

interface MediaListProps {
  list: MediaListType[];
  showActions?: boolean;
  showThumbnail?: boolean;
  addItem?: (item?: MediaListType) => void;
  removeItem?: (item?: MediaListType) => void;
  onViewDetail?: (item: MediaListType) => void;
  selectable?: boolean;
  actionIconRight?: string;
}

export const MediaList = ({
  list,
  showThumbnail,
  showActions = true,
  addItem = () => {},
  removeItem = () => {},
  onViewDetail = () => {},
  selectable,
  actionIconRight,
}: MediaListProps) => {
  return (
    <View style={{ marginBottom: 25 }}>
      {list.map((item, idx, arr) => {
        // const { _id, title, description, thumbnail } = item;
        const { _id, title, thumbnail } = item;
        return (
          <View key={`item_${_id}`}>
            <MediaListItem
              title={title}
              titleStyle={defaultStyles.titleText}
              /* description={
                <>
                  <Text style={defaultStyles.description}>{shortenText(description || '', 80)}</Text>
                </>
              } */
              image={thumbnail}
              selectable={selectable}
              showThumbnail={showThumbnail}
              showPlayableIcon={false}
              showActions={showActions}
              onChecked={(v) => (v ? addItem(item) : removeItem(item))}
              onViewDetail={() => onViewDetail(item)}
              iconRight={actionIconRight}
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
    fontSize: 15,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  description: {
    color: theme.colors.textDarker,
    fontSize: 14,
    marginTop: 2,
    marginBottom: 4,
  },
});
