import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { findUserPlaylists, selectPlaylistAction } from '../../state/modules/playlists';

import { PlaylistResponseDto } from '../../api';

import { useLoadPlaylistData } from '../../hooks/useLoadData';
import { useRouteName, useViewPlaylistById } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { FAB } from 'react-native-paper';
import { RefreshControl } from 'react-native';

import { View } from 'react-native';
import { List } from 'native-base';
import { MediaListItem } from '../layout/MediaListItem';
import { PageContainer, PageContent, PageProps } from '../layout/PageContainer';

import { shortenText } from '../../utils';

import { theme } from '../../styles';

export interface PlaylistsProps {
  list: PlaylistResponseDto[];
  onViewDetailClicked: Function;
  onChecked?: (checked: boolean, item?: any) => void;
}

/* export function mapPlaylists(playlist: PlaylistResponseDto[]) {
  const list = playlist.map((item) => {
    const keyed = {
      id: item._id,
      title: item.title,
      description: `${item?.mediaItems?.length || 0} Videos`,
      key: item._id,
      ...item,
    };
    return keyed;
  });
  return list;
} */

export const PlaylistsComponent = ({ onViewDetailClicked, list = [], onChecked = () => {} }: PlaylistsProps) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      <List>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {sortedList.map((item, idx) => {
          const { title, description, mediaIds } = item;
          return (
            <MediaListItem
              key={item._id}
              title={title}
              description={`${shortenText(description, 40)}\n${mediaIds.length || 0} videos`}
              showThumbnail={true}
              onViewDetail={() => {
                onViewDetailClicked(item);
              }}
              onChecked={(checked) => onChecked(checked, item)}
            />
          );
        })}
      </List>
    </View>
  );
};

export const Playlists = ({ onDataLoaded }: PageProps) => {
  const shareWithAction = useRouteName(ROUTES.shareWith);
  const createPlaylistAction = useRouteName(ROUTES.playlistAdd);
  const viewPlaylistAction = useViewPlaylistById();

  const dispatch = useDispatch();

  const [{ state, loaded }] = useLoadPlaylistData();
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(refresh, [dispatch]);
  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, dispatch, onDataLoaded]);

  const updateSelection = function (bool, item) {
    dispatch(selectPlaylistAction({ isChecked: bool, plist: item }));
  };

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'share', onPress: shareWithAction, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'add', onPress: createPlaylistAction, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  return (
    <PageContainer>
      <PageContent refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <PlaylistsComponent
          onChecked={updateSelection}
          list={state.playlists.userPlaylists}
          onViewDetailClicked={(item) => viewPlaylistAction({ playlistId: item._id })}
        />
      </PageContent>
      <FAB.Group
        visible={true}
        open={fabState.open}
        icon={fabState.open ? 'close' : 'more-vert'}
        actions={fabActions}
        color={theme.colors.primaryTextLighter}
        fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
        onStateChange={(open) => {
          setFabState(open);
        }}
      />
    </PageContainer>
  );

  async function loadData() {
    await dispatch(findUserPlaylists({}));
    setIsLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    await dispatch(findUserPlaylists({}));
    setRefreshing(false);
  }
};

export default withLoadingSpinner(Playlists);
