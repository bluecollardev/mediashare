import { Container, Content, List, View } from 'native-base';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { MediaListItem } from '../../components/layout/MediaListItem';
import { PlaylistCard } from '../../components/layout/PlaylistCard';
import { routeConfig } from '../../routes';
import styles from '../../screens/Home/styles';
import PlaylistDetail from '../../screens/PlaylistDetail';
import { getUserPlaylistById } from '../../state/modules/playlists';
import { useAppSelector } from '../../state/index';
import { getPlaylistById } from '../../state/modules/playlists/index';
import { useEffect } from 'react';
export interface PlaylistDetailContainerProps {
  navigation: any;
  route: any;
  fetchList: Function;
  data: Object;
  state: Object;
  playlistId: string | number; // TODO: Make a type
}
export interface PlaylistDetailContainerState {}

const PlaylistDetailContainer = ({ route, navigation, data }) => {
  // const { fetchList } = props;
  // const { playlistId } = props?.route?.params;
  // fetchList(playlistId);
  console.log(route);
  const id = route?.params?.playlistId;
  const isCreate = !!id;
  const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';
  const dispatch = useDispatch();

  const playlist = useAppSelector((state) => state.playlist);
  if (!playlist.loading && playlist?.selectedPlaylist?._id !== id) {
    dispatch(getPlaylistById(id));
  }
  const author = '';
  const { selectedPlaylist } = playlist || {};

  const { description = '', title = '' } = selectedPlaylist || {};
  const onEditClicked = () => {
    console.log('dispatch');
    navigation.navigate(routeConfig.playlistEdit.name, { id });
  };
  const onDeleteClicked = () => {};
  const items = selectedPlaylist?.mediaItems || [];

  return (
    <Container style={styles.container}>
      <Content>
        <View padder>
          <PlaylistCard
            title={title}
            author={author}
            description={description}
            showSocial={true}
            showActions={true}
            onEditClicked={onEditClicked}
            onDeleteClicked={onDeleteClicked}
          />
          <PlaylistDetail navigation={navigation} list={data} />
          <View>
            <List>
              {items.map((item, idx) => {
                const { title, description, thumbnail } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={thumbnail}
                    onViewDetail={() => {
                      navigation.navigate(routeConfig.libraryItemDetail.name);
                    }}
                  />
                );
              })}
            </List>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default PlaylistDetailContainer;
