import React from 'react';
import { usePreviewImage } from 'mediashare/hooks/usePreviewImage';
import { Dimensions, FlatList, View, TouchableHighlight } from 'react-native';
import { useViewPlaylistById } from 'mediashare/hooks/navigation';
import { MediaCard, NoContent, SectionHeader } from 'mediashare/components/layout';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';

export interface FeedRecentlyPlayedProps {
  list: PlaylistResponseDto[];
  selectable?: boolean;
  clearSelection?: boolean;
  showActions?: boolean;
  onViewDetailClicked?: Function;
  onChecked?: (checked: boolean, item?: any) => void;
  displayNoContent?: boolean;
}

export const FeedRecentlyPlayed = ({ list = [], displayNoContent = false }: FeedRecentlyPlayedProps) => {
  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item._id });

  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  const noContentIsVisible = displayNoContent && sortedList && sortedList.length === 0;

  return (
    <View style={{ marginBottom: 15 }}>
      <SectionHeader title={`Resume Playing`} />
      {sortedList && sortedList.length > 0 && (
        <FlatList horizontal={true} data={sortedList} renderItem={({ item }) => renderVirtualizedListItem(item)} keyExtractor={({ _id }) => `playlist_${_id}`} />
      )}
      {noContentIsVisible && (
        <NoContent messageButtonText="Items that are shared with you will show up in your feed." icon="view-list" />
      )}
    </View>
  );

  function renderVirtualizedListItem(item) {
    // TODO: Can we have just one or the other, either mediaIds or mediaItems?
    const { _id = '', title = '', authorProfile = {} as AuthorProfileDto, description = '', mediaIds = [], mediaItems = [], imageSrc = '' } = item;
    const dimensions = {
      w: Dimensions.get('window').width / 2,
      h: Dimensions.get('window').width / 2 + 100
    };

    console.log(`[DisplayPreviewOrVideo] thumbnail: ${imageSrc}`);
    const mediaPreview = usePreviewImage(imageSrc);

    return (
      <View style={{ width: dimensions.w, height: dimensions.h }}>
        <TouchableHighlight
          style={{ width: dimensions.w, height: dimensions.h, zIndex: 10 }}
          onPress={async () => {
            await viewPlaylist(item);
          }}
        >
          <MediaCard
            key={`playlist_${_id}`}
            title={title}
            // description={<MediaListItem.Description data={{ authorProfile, itemCount: mediaIds?.length || mediaItems?.length || 0 }} showItemCount={true} />}
            showThumbnail={true}
            thumbnail={mediaPreview.imageSrc}
            thumbnailStyle={{
              aspectRatio: 1 / 1,
              padding: 10
            }}
            showActions={false}
            showAvatar={false}
          />
        </TouchableHighlight>
      </View>
    );
  }
};
