import * as React from 'react';
import { Container, Content, View, Text, Button, Icon, List, CardItem } from 'native-base';
import { MediaListItem } from '../../components/layout/MediaListItem';
import { routeConfig } from '../../routes';
import styles from './styles';
import { MediaItemsApi } from '../../api';
import { Storage } from 'aws-amplify';
import { useState } from 'react';
import Video from 'react-native-video';

export interface LibraryProps {
  navigation: any;
  list: any;
}

export interface LibraryState {}
const Library = ({ navigation, list }: { navigation: any; list: any }) => {
  const [item, setItem] = useState(null);
  const imageSrc = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

  const items = list?.map((item) => ({
    title: item.title,
    description: `${item?.mediaItems?.length || 0} Videos`,
    image: imageSrc,
  }));

  // this.fetchImages().subscribe((obs) => console.log(obs));

  const fetchImage = async function (key: string) {
    const res = await Storage.get(key);
    console.log('set item', res);
    setItem(res);
  };
  const clearItem = () => {
    setItem(null);
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
              navigation.navigate(routeConfig.addToPlaylist.name);
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
                return <MediaListItem key={`item-${idx}`} title={title} description={description} image={image} onViewDetail={() => fetchImage(title)} />;
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
              navigation.navigate(routeConfig.addToPlaylist.name);
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
