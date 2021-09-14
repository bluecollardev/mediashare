import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, Text } from 'react-native';

import { useAppSelector } from '../../state';
import { findUserPlaylists, getPlaylistById } from '../../state/modules/playlists';

import { useViewSharedMediaItem } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { PlaylistCard } from '../layout/PlaylistCard';
import { MediaList } from '../layout/MediaList';
import { PageContainer, PageProps } from '../layout/PageContainer';

export const ExploreDetail = ({ route }: PageProps) => {
  const dispatch = useDispatch();

  const onViewMediaItemClicked = useViewSharedMediaItem();

  const loadData = async function () {
    await dispatch(getPlaylistById(playlistId));

    setIsLoaded(true);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loaded, setIsLoaded] = useState(false);
  const playlist = useAppSelector((state) => state.playlist);

  const { playlistId = '' } = route?.params;
  useEffect(() => {
    if (!playlist.loading && playlist.selectedPlaylist?._id !== playlistId) {
      loadData();
    }
  });

  if (!playlistId) {
    return <Text>Item not found</Text>;
  }

  const { selectedPlaylist } = playlist || {};

  const { description = '', title = '', user } = selectedPlaylist || {};

  const items = selectedPlaylist?.mediaItems || [];
  const author = user?.username;

  return (
    <PageContainer>
      <ScrollView>
        <PlaylistCard title={title} author={author} description={description} showSocial={false} showActions={false} category={''} />
        <MediaList onViewDetail={(item) => onViewMediaItemClicked({ mediaId: item._id, uri: item.uri })} list={items} isSelectable={false} />
      </ScrollView>
    </PageContainer>
  );
};

export default withLoadingSpinner(ExploreDetail);
