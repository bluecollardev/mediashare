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
import { PageContainer } from '../layout/PageContainer';

import { theme } from '../../styles';

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

export interface PlaylistsContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const Playlists = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [{ AppSpinner, isLoading, endLoad, startLoad }] = useSpinner({ loadingState: true });
  const loadData = async function () {
    await dispatch(findUserPlaylists({}));
  };

  const shareWithAction = useRouteName(ROUTES.shareWith);
  const createPlaylistAction = useRouteName(ROUTES.playlistAdd);
  const viewPlaylistAction = useRouteWithParams(ROUTES.playlistDetail);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(findUserPlaylists({}));
    setRefreshing(false);
  }, [dispatch]);

  const [{ state }] = useLoadPlaylistData();

  const updateSelection = function (bool, item) {
    dispatch(selectPlaylistAction({ isChecked: bool, plist: item }));
  };

  const [fabState, setState] = useState({ open: false });

  const fabActions = [
    { icon: 'ios-share', onPress: shareWithAction, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'playlist-add', onPress: createPlaylistAction, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
  ];

  useEffect(() => {
    if (!loaded) {
      loadData().then(() => setLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

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
          setState(open);
        }}
        // onPress={() => setOpen(!open)}
      />
      {/* <ListActionButton actionCb={shareWithAction} label="Share With User" icon="share" /> */}
    </PageContainer>
  );
};

export default withLoadingSpinner(Playlists);
