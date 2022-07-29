import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { MediaCard, SectionHeader } from 'mediashare/components/layout';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';

export interface FeedRecentlyPlayedProps {
  list: PlaylistResponseDto[];
  selectable?: boolean;
  clearSelection?: boolean;
  showActions?: boolean;
  onViewDetailClicked?: Function;
  onChecked?: (checked: boolean, item?: any) => void;
}

export const FeedRecentlyPlayed = ({ list = [], onViewDetailClicked, selectable = false, showActions = true, onChecked = () => undefined }: FeedRecentlyPlayedProps) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));


  const dimensions = {
    h: Dimensions.get('window').height / 3
  };

  return (
    <View style={{ height: dimensions.h }}>
      <SectionHeader title={`Recently Played`} />
      <FlatList horizontal={true} data={sortedList} renderItem={({ item }) => renderVirtualizedListItem(item)} keyExtractor={({ _id }) => `playlist_${_id}`} />
    </View>
  );

  function renderVirtualizedListItem(item) {
    // TODO: Can we have just one or the other, either mediaIds or mediaItems?
    const { _id = '', title = '', authorProfile = {} as AuthorProfileDto, description = '', mediaIds = [], mediaItems = [], imageSrc = '' } = item;
    const dimensions = {
      w: Dimensions.get('window').width / 2,
      h: Dimensions.get('window').width / 2
    };

    return (
      <View style={{ width: dimensions.w, height: dimensions.h }}>
        <MediaCard
          key={`playlist_${_id}`}
          title={title}
          // description={<MediaListItem.Description data={{ authorProfile, itemCount: mediaIds?.length || mediaItems?.length || 0 }} showItemCount={true} />}
          showThumbnail={true}
          thumbnail={imageSrc}
          showActions={false}
          showAvatar={false}
        />
      </View>
    );
  }
};
