import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Content, View, Text, List } from 'native-base';

import { ROUTES } from '../../../routes';

import { useRouteName, useRouteWithParams } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { findUserPlaylists, selectPlaylistAction } from '../../../state/modules/playlists';

import { TopActionButtons } from '../../layout/TopActionButtons';
import { ListActionButton } from '../../layout/ListActionButton';
import { MediaListItem } from '../../layout/MediaListItem';

import { PlaylistResponseDto } from '../../../api';

import styles from '../../../styles';

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

export interface PlaylistsState {}

export const Playlists = ({ onViewDetailClicked, list, onChecked = () => {} }: PlaylistsProps) => {
  if (!list) {
    return <Text>...loading</Text>;
  }

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

export const PlaylistsContainer = () => {
  const dispatch = useDispatch();

  const shareWithAction = useRouteName(ROUTES.shareWith);
  const createPlaylistAction = useRouteName(ROUTES.playlistAdd);
  const viewPlaylistAction = useRouteWithParams(ROUTES.playlistDetail);
  const playlists = useAppSelector((state) => state.playlists);

  const [loaded, setLoaded] = useState(false);

  const loadData = async function () {
    await dispatch(findUserPlaylists({}));

    setLoaded(true);
  };
  const selectedPlaylists = useAppSelector((state) => state.playlists.selectedPlaylists);

  const updateSelection = function (bool, item) {
    dispatch(selectPlaylistAction({ isChecked: bool, plist: item }));
    console.log(selectedPlaylists);
  };
  useEffect(() => {
    if (!loaded) {
      loadData();
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  if (!loaded) {
    return <Text>Loading</Text>;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <Container style={styles.container}>
      <TopActionButtons leftAction={createPlaylistAction} rightAction={shareWithAction} leftLabel="Create Playlist" rightLabel="Share Playlist" />
      <Content>
        <Playlists onChecked={updateSelection} list={playlists.userPlaylists} onViewDetailClicked={(item) => viewPlaylistAction({ playlistId: item._id })} />
      </Content>
      <ListActionButton actionCb={shareWithAction} label="Share With User" icon="share" />
    </Container>
  );
};

export default PlaylistsContainer;
