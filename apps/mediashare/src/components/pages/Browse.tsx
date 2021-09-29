import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ScrollView } from 'react-native';

import { useAppSelector } from '../../state';
import { findUserPlaylists } from '../../state/modules/playlists';
import { PlaylistResponseDto } from '../../api';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { List, Text, Searchbar, Card } from 'react-native-paper';

import { PageContainer, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/MediaCard';

import { shortenText } from '../../utils';
import { SceneMap, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles, { theme } from '../../styles';
import { useViewMediaItem, useViewPlaylistById } from '../../hooks/NavigationHooks';
import { findMediaItems } from '../../state/modules/media-items';
import { MediaItem } from '../../rxjs-api';

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
            <View style={{ padding: 15, paddingTop: 0 }} key={`article_${_id}`}>
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

  let sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));
  sortedList = sortedList.filter((item) => item.mediaIds.length > 0);

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item._id });

  return (
    <ScrollView
      contentInset={{ bottom: 120 }}
      contentContainerStyle={{ height: '100%', flex: 1, backgroundColor: theme.colors.background, flexDirection: 'row', flexWrap: 'wrap' }}
    >
      {sortedList.map((item) => {
        const { _id, title, description, imageSrc } = item;

        return (
          <Card key={`item_${_id}`} onPress={() => viewPlaylist(item)} style={{ flexBasis: '50%', padding: 5, backgroundColor: 'transparent' }}>
            <Card.Title title={title} titleStyle={{ fontSize: 14 }} subtitle={`${shortenText(description, 40)}`} />
            <Card.Cover source={{ uri: imageSrc }} />
          </Card>
        );
      })}
    </ScrollView>
  );
};

export const Popular = () => {
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
      contentContainerStyle={{ height: '100%', flex: 1, backgroundColor: theme.colors.background, flexDirection: 'row', flexWrap: 'wrap' }}
    >
      {sortedList.map((item) => {
        const { _id, title, description, thumbnail } = item;

        return (
          <Card key={`item_${_id}`} onPress={() => viewMediaItem(item)} style={{ flexBasis: '50%', padding: 5, backgroundColor: 'transparent' }}>
            <Card.Title title={title} titleStyle={{ fontSize: 14 }} subtitle={`${shortenText(description, 40)}`} />
            <Card.Cover source={{ uri: thumbnail }} />
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
  popular: Popular,
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
    { key: 'popular', title: 'Popular', icon: 'movie-filter' },
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
              <TouchableOpacity style={props.navigationState.index === i ? styles.tabItemActive : styles.tabItem} onPress={() => setIndex(i)}>
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
        <Searchbar placeholder={`Search ${routes[index].title}`} value={''} />
      </View>
    );
  }

  async function loadData() {
    await dispatch(findUserPlaylists({}));
  }
};

export default withLoadingSpinner(Browse);
