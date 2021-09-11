import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Content, Text, View } from 'native-base';
import { List } from 'react-native-paper';
import { ROUTES } from '../../../routes';

import { useRouteWithParams } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { findUserPlaylists } from '../../../state/modules/playlists';

import { MediaListItem } from '../../layout/MediaListItem';

import { PlaylistResponseDto } from '../../../api';

import styles from '../../../styles';

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
  if (!list) {
    return <Text>...loading</Text>;
  }

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
  const dispatch = useDispatch();
  const viewPlaylistAction = useRouteWithParams(ROUTES.sharedPlaylistDetail);
  const playlists = useAppSelector((state) => state.playlists);

  const [loaded, setLoaded] = useState(false);

  const loadData = async function () {
    await dispatch(findUserPlaylists({}));

    setLoaded(true);
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
      <Content>
        <Explore list={playlists.userPlaylists} onViewDetailClicked={(item) => viewPlaylistAction({ playlistId: item._id })} />
      </Content>
    </Container>
  );
};

export default ExploreContainer;
