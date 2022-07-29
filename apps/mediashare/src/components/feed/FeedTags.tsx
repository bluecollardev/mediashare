import React from 'react';
import { Dimensions, View } from 'react-native';
// import { Divider } from 'react-native-paper';
import { MediaListItem, SectionHeader } from 'mediashare/components/layout';
import styles from 'mediashare/styles';

export interface FeedTagsBlockProps {
  list: any[];
  onViewDetailClicked?: Function;
}

export const FeedTags = ({ list = [], onViewDetailClicked }: FeedTagsBlockProps) => {
  // TODO: Make this configurable, or use the most popular tags ONLY!
  const tagsToDisplay = ['ankle', 'elbow', 'foot-and-ankle', 'hand', 'hip', 'knee', 'lower-back', 'neck', 'shoulder', 'upper-back', 'wrist'];
  const sortedList = list.map((tag) => tag).filter((tag) => tagsToDisplay.includes(tag.key));
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));
  const displayTags = sortedList.slice(0, 6);

  const dimensions = {
    w: Dimensions.get('window').width
  };

  return (
    <View style={{ marginBottom: 15 }}>
      <SectionHeader title={`Popular Categories`} />
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: dimensions.w }}>
        {displayTags.map((tag) => renderVirtualizedListItem(tag))}
      </View>
    </View>
  );

  function renderVirtualizedListItem(item) {
    // TODO: Can we have just one or the other, either mediaIds or mediaItems?
    const { key = '', value = '', description = '', mediaIds = [], mediaItems = [], imageSrc = '' } = item;
    const dimensions = {
      w: Dimensions.get('window').width / 2
    };

    return (
      <View key={key} style={{ width: dimensions.w }}>
        <MediaListItem
          key={`tag_${key}`}
          title={value}
          titleStyle={styles.titleText}
          // description={`0 playlists`}
          showThumbnail={true}
          image={imageSrc}
          showActions={false}
          selectable={false}
          showPlayableIcon={false}
          onViewDetail={() => onViewDetailClicked(item)}
        />
      </View>
    );
  }
};
