import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getPlaylistById } from '../../state/modules/playlists';

import { useViewSharedMediaItem } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { MediaCard } from '../layout/MediaCard';
import { MediaList } from '../layout/MediaList';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';

export const ExploreDetail = ({ route, onDataLoaded }: PageProps) => {
  const { playlistId = '' } = route?.params;

  const dispatch = useDispatch();

  const onViewMediaItemClicked = useViewSharedMediaItem();

  const { selectedPlaylist, loaded } = useAppSelector((state) => state.playlist);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(refresh, [dispatch, playlistId]);
  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
    }
  }, [isLoaded, dispatch, onDataLoaded]);

  const { description = '', title = '', user } = selectedPlaylist || {};

  const items = selectedPlaylist?.mediaItems || [];
  const author = user?.username;

  return (
    <PageContainer>
      <PageContent>
        <MediaCard title={title} author={author} description={description} showSocial={true} showActions={false} category={'General'} />
        <MediaList
          onViewDetail={(item) => onViewMediaItemClicked({ mediaId: item._id, uri: item.uri })}
          list={items}
          isSelectable={false}
          showThumbnail={true}
        />
      </PageContent>
    </PageContainer>
  );

  async function loadData() {
    await dispatch(getPlaylistById(playlistId));
    setIsLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    await dispatch(getPlaylistById(playlistId));
    setRefreshing(false);
  }
};

export default withLoadingSpinner(ExploreDetail);
