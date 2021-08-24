import * as React from 'react';
import { Container, Content, View, Text, Button, Icon, List, CardItem } from 'native-base';
import { MediaListItem } from '../../components/layout/MediaListItem';
import { routeConfig } from '../../routes';
import styles from './styles';
import { useState } from 'react';
import Video from 'react-native-video';
import { AwsMediaItem } from '../../state/modules/media-items/aws-media-item.model';
import { useDispatch } from 'react-redux';
import { getMediaItemById, selectMediaItem } from '../../state/modules/media-items/index';
import { MediaViewItem } from '../../state/modules/media-items/media-view-item.model';

export interface LibraryProps {
  navigation: any;
  list: any;
}

export interface LibraryState {}
const Library = ({ navigation, list }: { navigation: any; list: AwsMediaItem[] }) => {
  const dispatch = useDispatch();
  const [item] = useState(null);
  const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

  const items = list?.map((item) => ({
    title: item.key,
    description: `${item?.size} `,
    image: imageSrc,
  }));

  // this.fetchImages().subscribe((obs) => console.log(obs));
  const viewItem = async function (item: MediaViewItem) {
    dispatch(getMediaItemById(item.title));
    dispatch(selectMediaItem(item));
    navigation.navigate(routeConfig.libraryItemDetail.name);
  };

  return (
    <Container style={styles.container}>
      <Content>
        <View padder style={{ flexDirection: 'row' }}>
          <Button iconLeft bordered dark style={{ flex: 1, marginRight: 10 }} onPress={() => navigation.navigate(routeConfig.addFromFeed.name)}>
            <Icon name="add-outline" />
            <Text style={{ paddingRight: 30 }}>Add From Feed</Text>
          </Button>
          <Button
            iconLeft
            bordered
            dark
            style={{ flex: 1 }}
            onPress={() => {
              navigation.navigate(routeConfig.addMedia.name);
            }}
          >
            <Icon name="add-outline" />
            <Text style={{ paddingRight: 30 }}>Add Media</Text>
          </Button>
        </View>
        <View>
          {!item ? (
            <List>
              {/* <ListItemGroup key={'group1'} text={'Group 1'} /> */}
              {items.map((item, idx) => {
                const { title, description, image } = item;
                return <MediaListItem key={`item-${idx}`} title={title} description={description} image={image} onViewDetail={() => viewItem(item)} />;
              })}
              {/* <ListItemGroup key={'group2'} text={'Group 2'} /> */}
            </List>
          ) : (
            <CardItem>
              <Video source={{ uri: item }} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />
            </CardItem>
          )}
        </View>
        <View padder style={{ flexDirection: 'row' }}>
          <Button
            iconLeft
            bordered
            dark
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={() => {
              navigation.navigate(routeConfig.addFromLibrary.name);
            }}
          >
            <Icon name="add-outline" />
            <Text style={{ paddingRight: 30 }}>Add to Playlist</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default Library;
