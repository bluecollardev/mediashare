import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { findUserPlaylists } from '../../state/modules/playlists';
import { PlaylistResponseDto } from '../../api';

import { useSpinner } from '../../hooks/useSpinner';
import { useRouteWithParams } from '../../hooks/NavigationHooks';

import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import { PageContainer } from '../layout/PageContainer';
import { MediaListItem } from '../layout/MediaListItem';

export interface ExploreProps {
  list: PlaylistResponseDto[];
  onViewDetailClicked: Function;
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

export interface ExploreState {}

export const Explore = ({ onViewDetailClicked, list }: ExploreProps) => {
  let sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));
  sortedList = sortedList.filter((item) => item.mediaIds.length > 0);

  return (
    <View>
      <List.Section>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}

        <List.Subheader>Playlists by Adam Fehr</List.Subheader>

        {sortedList.slice(0, 1).map((item, idx) => {
          const { title, mediaIds } = item;
          return (
            <MediaListItem
              key={item._id}
              title={title}
              selectable={false}
              showThumbnail={true}
              description={`${mediaIds.length || 0} videos`}
              onViewDetail={() => {
                onViewDetailClicked(item);
              }}
            />
          );
        })}
      </List.Section>

      <List.Section>
        <List.Subheader>Popular</List.Subheader>

        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {sortedList.slice(2, 8).map((item, idx) => {
          const { title, mediaIds } = item;
          return (
            <MediaListItem
              key={item._id}
              title={title}
              selectable={false}
              showThumbnail={true}
              description={`${mediaIds.length || 0} videos`}
              onViewDetail={() => {
                onViewDetailClicked(item);
              }}
            />
          );
        })}
      </List.Section>
    </View>
  );
};

export interface ExploreContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
  state: Object;
}

export const ExploreContainer = () => {
  // Set up the loader
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ AppSpinner, isLoading, endLoad, startLoad }] = useSpinner({ loadingState: true });
  const loadData = async function () {
    await dispatch(findUserPlaylists({}));
  };
  // Do other stuff

  const viewPlaylistAction = useRouteWithParams(ROUTES.sharedPlaylistDetail);

  const playlists = useAppSelector((state) => state.playlists);

  // Load our data right before rendering
  useEffect(() => {
    if (!loaded) {
      loadData().then(() => setLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return isLoading || !loaded ? (
    <AppSpinner />
  ) : (
    <PageContainer>
      <ScrollView>
        <Explore list={playlists.userPlaylists} onViewDetailClicked={(item) => viewPlaylistAction({ playlistId: item._id })} />
      </ScrollView>
    </PageContainer>
  );
};

export default ExploreContainer;
