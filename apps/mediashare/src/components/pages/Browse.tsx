import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { findUserPlaylists } from '../../state/modules/playlists';
import { findMediaItems } from '../../state/modules/media-items';

import { PlaylistResponseDto } from '../../rxjs-api';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { useViewMediaItem, useViewPlaylistById } from '../../hooks/NavigationHooks';

import { ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { List, Text, Card, Button } from 'react-native-paper';
import { SceneMap, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PageContainer, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/MediaCard';
import { PlaylistsComponent } from './Playlists';

import { shortenText } from '../../utils';

import styles, { theme } from '../../styles';

/* export function mapPlaylists(playlist: PlaylistResponseDto[]) {
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
} */

export interface BrowseProps {
  list: PlaylistResponseDto[];
  onViewDetailClicked: Function;
}

export const Articles = () => {
  const playlists = useAppSelector((state) => state.playlists);
  const list = playlists?.userPlaylists || [];

  let sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));
  sortedList = sortedList.filter((item) => item.mediaIds.length > 0);

  return (
    <View>
      <List.Section>
        <List.Subheader>Latest Articles</List.Subheader>
        {sortedList.slice(0, 2).map((item) => {
          const { _id, title, description } = item;
          return (
            <View key={`article_${_id}`} style={{ padding: 15, paddingTop: 0 }}>
              <MediaCard
                title={title}
                author={'Admin'}
                description={description}
                category={'General'}
                showSocial={true}
                showActions={false}
                showThumbnail={true}
              />
            </View>
          );
        })}
      </List.Section>
    </View>
  );
};

export const Playlists = () => {
  const playlists = useAppSelector((state) => state.playlists);
  const list = playlists?.userPlaylists || [];

  let sortedList = list.map((item) => {
    const { mediaIds, description } = item;
    const itemDescription = `${shortenText(description, 40)}\n${mediaIds.length || 0} videos`;
    return Object.assign({}, item, { itemDescription });
  });

  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));
  sortedList = sortedList.filter((item) => item.mediaIds.length > 0);

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item._id });

  return (
    <ScrollView>
      <PlaylistsComponent list={sortedList} onViewDetailClicked={viewPlaylist} />
    </ScrollView>
  );

  /*
  <Card key={`item_${_id}`} onPress={} style={{ flexBasis: '50%', padding: 5, backgroundColor: 'transparent' }}>
    <Card.Title title={title} titleStyle={{ fontSize: 14 }} subtitle={`${shortenText(description, 40)}`} />
    <Card.Cover source={{ uri: imageSrc }} />
  </Card>
  */
};

export const Videos = () => {
  const dispatch = useDispatch();

  const { loaded, mediaItems } = useAppSelector((state) => state.mediaItems);
  const [isLoaded, setIsLoaded] = useState(loaded);
  const list = mediaItems || [];

  useEffect(() => {
    if (!isLoaded) {
      loadData().then();
    }
  }, [isLoaded, dispatch]);

  let sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  const viewMediaItemAction = useViewMediaItem();
  const viewMediaItem = (item) => viewMediaItemAction({ mediaId: item._id, uri: item.mediaSrc });

  return (
    <ScrollView
      contentInset={{ bottom: 120 }}
      contentContainerStyle={styles.tabContent}
    >
      {sortedList.map((item) => {
        const { _id, title, description, thumbnail } = item;

        return (
          <Card key={`item_${_id}`} onPress={() => viewMediaItem(item)} style={styles.card50} elevation={0}>
            <Card.Title title={title} titleStyle={{ fontSize: 14 }} subtitle={`${shortenText(description, 40)}`} />
            <Card.Content>
              <ImageBackground source={{ uri: thumbnail }} resizeMode="cover" style={{ width: '100%', height: 100 }}>
                <TouchableWithoutFeedback onPress={() => viewMediaItem(item)}>
                  <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Button icon="play-circle-filled" color="#ffffff" labelStyle={{ fontSize: 33 }} />
                  </View>
                </TouchableWithoutFeedback>
              </ImageBackground>
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );

  async function loadData() {
    dispatch(findMediaItems());
    setIsLoaded(true);
  }
};

const renderScene = SceneMap({
  playlists: Playlists,
  videos: Videos,
  articles: Articles,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Browse = ({}: PageProps) => {
  const layout = useWindowDimensions();
  // Set up the loader
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'playlists', title: 'Playlists', icon: 'subscriptions' },
    { key: 'videos', title: 'Videos', icon: 'movie-filter' },
    { key: 'articles', title: 'Articles', icon: 'library-books' },
  ]);
  // Do other stuff

  // Load our data right before rendering
  useEffect(() => {
    if (!isLoaded) {
      loadData().then(() => setIsLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <PageContainer>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => renderTabBar(props)}
        initialLayout={{ width: layout.width, height: layout.height }}
      />
    </PageContainer>
  );

  function renderTabBar(props) {
    return (
      <View>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={`tab_${i}-${route.name}`}
                style={props.navigationState.index === i ? styles.tabItemActive : styles.tabItem}
                onPress={() => setIndex(i)}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons
                    name={route.icon}
                    color={props.navigationState.index === i ? theme.colors.primaryText : theme.colors.disabled}
                    size={26}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontWeight: 'bold' }}>{route.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  async function loadData() {
    await dispatch(findUserPlaylists({}));
  }
};

export default withLoadingSpinner(Browse);
