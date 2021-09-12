import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { List, Text, View } from 'native-base';

import { ROUTES } from '../../../routes';

import { useRouteName, useRouteWithParams } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { findUserPlaylists, selectPlaylistAction } from '../../../state/modules/playlists';

import { TopActionButtons } from '../../layout/TopActionButtons';
import { ListActionButton } from '../../layout/ListActionButton';
import { MediaListItem } from '../../layout/MediaListItem';

import { PlaylistResponseDto } from '../../../api';

import PageContainer from '../../layout/PageContainer';
import AppContent from '../../layout/AppContent';
import { SPINNER_DEFAULTS, useSpinner } from '../../../hooks/useSpinner';
import { ScrollView } from 'react-native';
import { useLoadData, useLoadPlaylistData } from '../../../hooks/useLoadData';

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

  const [{ AppSpinner, endLoad, isLoading }] = useSpinner();
  const [{ loaded, state }] = useLoadPlaylistData({ endLoad });

  const updateSelection = function (bool, item) {
    dispatch(selectPlaylistAction({ isChecked: bool, plist: item }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <PageContainer>
      <AppSpinner />
      <TopActionButtons leftAction={createPlaylistAction} rightAction={shareWithAction} leftLabel="Create Playlist" rightLabel="Share Playlist" />
      <ScrollView>
        <Playlists
          onChecked={updateSelection}
          list={state.playlists.userPlaylists}
          onViewDetailClicked={(item) => viewPlaylistAction({ playlistId: item._id })}
        />
      </ScrollView>

      <ListActionButton actionCb={shareWithAction} label="Share With User" icon="share" />
    </PageContainer>
  );
};

export default PlaylistsContainer;
