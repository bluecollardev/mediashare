import React from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { MediaListItem } from 'mediashare/components/layout';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';
import styles from 'mediashare/styles';

export interface FeedPlaylistsBlockProps {
  list: PlaylistResponseDto[];
  selectable?: boolean;
  clearSelection?: boolean;
  showActions?: boolean;
  onViewDetailClicked?: Function;
  onChecked?: (checked: boolean, item?: any) => void;
}

export const FeedPlaylists = ({ list = [], onViewDetailClicked, selectable = false, showActions = true, onChecked = () => undefined }: FeedPlaylistsBlockProps) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return <FlatList data={sortedList} renderItem={({ item }) => renderVirtualizedListItem(item)} keyExtractor={({ _id }) => `playlist_${_id}`} />;

  function renderVirtualizedListItem(item) {
    // TODO: Can we have just one or the other, either mediaIds or mediaItems?
    const { _id = '', title = '', authorProfile = {} as AuthorProfileDto, description = '', mediaIds = [], mediaItems = [], imageSrc = '' } = item;
    return (
      <>
        <MediaListItem
          key={`playlist_${_id}`}
          title={title}
          titleStyle={styles.titleText}
          description={<MediaListItem.Description data={{ authorProfile, itemCount: mediaIds?.length || mediaItems?.length || 0 }} showItemCount={true} />}
          showThumbnail={true}
          image={imageSrc}
          showPlayableIcon={false}
          showActions={showActions}
          selectable={selectable}
          onViewDetail={() => onViewDetailClicked(item)}
          onChecked={(checked) => onChecked(checked, item)}
        />
        <Divider key={`playlist_divider_${item._id}`} />
      </>
    );
  }
};
