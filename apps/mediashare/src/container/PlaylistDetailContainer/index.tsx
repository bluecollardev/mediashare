import { Container, Content, List, View } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import { MediaListItem } from '../../components/layout/MediaListItem';
import { PlaylistCard } from '../../components/layout/PlaylistCard';
import { routeConfig } from '../../routes';
import styles from '../../screens/Home/styles';
import PlaylistDetail from '../../screens/PlaylistDetail';
import { getUserPlaylistById } from '../../state/modules/playlists';

export interface PlaylistDetailContainerProps {
  navigation: any;
  route: any;
  fetchList: Function;
  data: Object;
  state: Object;
  playlistId: string | number; // TODO: Make a type
}
export interface PlaylistDetailContainerState {}

const PlaylistDetailContainer = (props) => {
  // const { fetchList } = props;
  // const { playlistId } = props?.route?.params;
  // fetchList(playlistId);
  console.log(props);
  const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

  const title = 'My First Playlist';
  const author = 'Blue Collar Dev';
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' + 'eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  const { state } = props;
  const { navigation, data } = props;
  const onEditClicked = () => {
    navigation.navigate(routeConfig.playlistEdit.name);
  };
  const onDeleteClicked = () => {};
  const items = [
    { title: 'Video 1', description: 'Ipsum lorem dolor', image: imageSrc },
    { title: 'Video 2', description: 'Ipsum lorem dolor', image: imageSrc },
    { title: 'Video 3', description: 'Ipsum lorem dolor', image: imageSrc },
    { title: 'Video 4', description: 'Ipsum lorem dolor', image: imageSrc },
    { title: 'Video 5', description: 'Ipsum lorem dolor', image: imageSrc },
  ];

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
          {/* <PlaylistDetail navigation={navigation} list={data} />; */}
          <View>
            <List>
              {items.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
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
