import React from 'react';
import { usePreviewImage } from 'mediashare/hooks/usePreviewImage';
import { useViewPlaylistById, useViewFeedSharedWithMe } from 'mediashare/hooks/navigation';
import { FlatList, View, Dimensions, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-paper';
import { MediaCard, SectionHeader } from 'mediashare/components/layout';
import { AuthorProfileDto, PlaylistResponseDto } from 'mediashare/rxjs-api';
import { theme } from 'mediashare/styles';

export interface FeedSharedByContactProps {
  list: PlaylistResponseDto[];
  selectable?: boolean;
  clearSelection?: boolean;
  showActions?: boolean;
  onViewDetailClicked?: Function;
  onChecked?: (checked: boolean, item?: any) => void;
}

export const FeedSharedByContact = ({ list = [] }: FeedSharedByContactProps) => {
  const viewFeedSharedWithMeAction = useViewFeedSharedWithMe();
  const viewFeedSharedWithMe = () => viewFeedSharedWithMeAction();
  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item._id });

  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  const dimensions = {
    h: 380
  };

  return (
    <View style={{ height: dimensions.h, marginBottom: 15 }}>
      <SectionHeader title={`Recently Added`} />
      <FlatList horizontal={true} data={sortedList} renderItem={({ item }) => renderVirtualizedListItem(item)} keyExtractor={({ _id }) => `playlist_${_id}`} />
      <Button
        icon="list"
        color={theme.colors.darkDefault}
        textColor={theme.colors.primary}
        uppercase={false}
        mode="outlined"
        compact
        dark
        onPress={() => viewFeedSharedWithMe()}
      >
        All Shared Playlists
      </Button>
    </View>
  );

  function renderVirtualizedListItem(item) {
    // TODO: Can we have just one or the other, either mediaIds or mediaItems?
    const { _id = '', title = '', authorProfile = {} as AuthorProfileDto, description = '', mediaIds = [], mediaItems = [], imageSrc = '' } = item;
    const dimensions = {
      w: Dimensions.get('window').width / 2,
      h: Dimensions.get('window').width / 2
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
