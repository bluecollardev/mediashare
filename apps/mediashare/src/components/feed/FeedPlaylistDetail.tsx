import React, { useMemo } from 'react';
import { AuthorProfileDto } from 'mediashare/rxjs-api';
import { View } from 'react-native';
import { MediaCard, ActionButtons } from 'mediashare/components/layout';
import { mapAvailableTags } from 'mediashare/core/utils/tags';
import { useViewPlaylistById } from 'mediashare/hooks/navigation';
import { shortenText } from 'mediashare/utils';

// const ShowMyShare = false;
// const { entities, loaded, loading } = useAppSelector((state) => state?.shareItems?.sharedWithMe);
// const list = filterUnique(entities, '_id').filter((e) => (ShowMyShare ? e : e.sharedWith != e.sharedBy)) || [];
// const viewPlaylistAction = useViewPlaylistById();
// const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item._id });
// <NoContent messageButtonText="Items that are shared with you will show up in your feed." icon="view-list" />

export const FeedPlaylistDetail = ({ globalState, item }) => {
  const { _id, title, description, authorProfile = {} as AuthorProfileDto, imageSrc, category, shareCount, viewCount, likesCount } = item;
  const { tags = [] } = globalState;
  const tagKeys = (item?.tags || []).map(({ key }) => key);
  const mappedTags = useMemo(() => mapAvailableTags(tags).filter((tag) => tag.isPlaylistTag), []);

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item._id });
  return (
    <View key={`${_id}`} style={{ padding: 0, paddingTop: 0 }}>
      <MediaCard
        elevation={1}
        title={title}
        authorProfile={authorProfile}
        description={shortenText(description, 200)}
        thumbnail={imageSrc}
        showThumbnail={true}
        category={category}
        availableTags={mappedTags}
        tags={tagKeys}
        showSocial={true}
        showActions={false}
        showDescription={true}
        shares={shareCount}
        views={viewCount}
        likes={likesCount}
      >
        <ActionButtons
          containerStyles={{ marginHorizontal: 0, marginVertical: 15 }}
          showSecondary={false}
          showPrimary={true}
          primaryLabel="Watch Now"
          primaryIcon="live-tv"
          onPrimaryClicked={() => viewPlaylist(item)}
        />
      </MediaCard>
    </View>
  );
};
