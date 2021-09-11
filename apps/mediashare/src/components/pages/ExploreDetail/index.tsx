import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Icon, View } from 'native-base';
import { Text } from 'react-native';

import { routeConfig } from '../../../routes';

import { useViewSharedMediaItem } from '../../../hooks/NavigationHooks';

import { useAppSelector } from '../../../state';
import { getPlaylistById } from '../../../state/modules/playlists';

import { PlaylistCard } from '../../layout/PlaylistCard';
import { MediaList } from '../../layout/MediaList';

import styles from '../../../styles';

export interface ExploreDetailProps {
  navigation: any;
  list: any;
}

export interface ExploreDetailState {}

export const ExploreDetail = (props) => {
  const { navigation } = props;

  return (
    <Button
      iconLeft
      bordered
      dark
      style={{ flex: 1, marginRight: 10, justifyContent: 'center' }}
      onPress={() => {
        navigation.navigate(routeConfig.addFromMedia.name);
      }}
    >
      <Icon name="add-outline" />
      <Text style={{ paddingRight: 30 }}>Add From Media</Text>
    </Button>
  );
};

export interface ExploreDetailContainerProps {
  navigation: any;
  route: any;
  fetchList: Function;
  data: Object;
  state: Object;
  playlistId: string | number; // TODO: Make a type
}

export interface ExploreDetailContainerState {}

export const ExploreDetailContainer = ({ route }) => {
  const onViewMediaItemClicked = useViewSharedMediaItem();
  const dispatch = useDispatch();

  const loadData = async function () {
    await dispatch(getPlaylistById(playlistId));

    setLoaded(true);
  };
  const [loaded, setLoaded] = useState(false);
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
    <Container style={styles.container}>
      <View padder>
        <PlaylistCard title={title} author={author} description={description} showSocial={false} showActions={false} />
      </View>
      <MediaList onViewDetail={(item) => onViewMediaItemClicked({ mediaId: item._id, uri: item.uri })} list={items} isSelectable={false} />
    </Container>
  );
};

export default ExploreDetailContainer;
