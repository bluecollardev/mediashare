import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { findUserPlaylists, selectPlaylistAction } from '../../state/modules/playlists';

import { PlaylistResponseDto } from '../../api';

import { useRouteName, useRouteWithParams } from '../../hooks/NavigationHooks';
import { SPINNER_DEFAULTS, useSpinner } from '../../hooks/useSpinner';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { FAB, Subheading } from 'react-native-paper';
import { RefreshControl, ScrollView } from 'react-native';
import { useLoadData, useLoadPlaylistData } from '../../hooks/useLoadData';

import { View } from 'react-native';
import { List } from 'native-base';
import { MediaListItem } from '../layout/MediaListItem';
import { PageContainer, PageProps } from '../layout/PageContainer';

import { theme } from '../../styles';
import { findMediaItems } from '../../state/modules/media-items';

export interface PlaylistsProps {
  list: PlaylistResponseDto[];
  onViewDetailClicked: Function;
  onChecked?: (checked: boolean, item?: any) => void;
}

export function mapPlaylists(playlist: PlaylistResponseDto[]) {
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
}

export const PlaylistsComponent = ({ onViewDetailClicked, list = [], onChecked = () => {} }: PlaylistsProps) => {
  const sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  return (
    <View>
      <List>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {sortedList.map((item, idx) => {
          const { title, mediaIds } = item;
          return (
            <MediaListItem
              key={item._id}
              title={title}
              description={`${mediaIds.length || 0} videos`}
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

export const Playlists = ({ navigation, onDataLoaded }: PageProps) => {
  const shareWithAction = useRouteName(ROUTES.shareWith);
  const createPlaylistAction = useRouteName(ROUTES.playlistAdd);
  const viewPlaylistAction = useRouteWithParams(ROUTES.playlistDetail);

  const dispatch = useDispatch();

  const [{ state, loaded }] = useLoadPlaylistData();
  const [isLoaded, setIsLoaded] = useState(loaded);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(refreshItems, [dispatch]);
  useEffect(() => {
    if (!isLoaded) {
      loadData().then(onDataLoaded);
    }
  }, [isLoaded, dispatch, onDataLoaded]);

  const updateSelection = function (bool, item) {
    dispatch(selectPlaylistAction({ isChecked: bool, plist: item }));
  };

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'ios-share', onPress: shareWithAction, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'share', onPress: createPlaylistAction, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'playlist-add', onPress: createPlaylistAction, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  return (
    <PageContainer>
      {/* <TopActionButtons leftAction={createPlaylistAction} rightAction={shareWithAction} leftLabel="Create Playlist" rightLabel="Share Playlist" /> */}
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <PlaylistsComponent
          onChecked={updateSelection}
          list={state.playlists.userPlaylists}
          onViewDetailClicked={(item) => viewPlaylistAction({ playlistId: item._id })}
        />
      </ScrollView>
      <FAB.Group
        visible={true}
        open={fabState.open}
        icon={fabState.open ? 'close' : 'more-vert'}
        actions={fabActions}
        color={theme.colors.primaryTextLighter}
        fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
        onStateChange={(open) => {
          // open && setOpen(!open);
          setFabState(open);
        }}
        // onPress={() => setOpen(!open)}
      />
      {/* <ListActionButton actionCb={shareWithAction} label="Share With User" icon="share" /> */}
    </PageContainer>
  );

  async function loadData() {
    await dispatch(findUserPlaylists({}));
    setIsLoaded(true);
  }

  async function refreshItems() {
    setRefreshing(true);
    await dispatch(findUserPlaylists({}));
    setRefreshing(false);
  }
};

export default withLoadingSpinner(Playlists);
