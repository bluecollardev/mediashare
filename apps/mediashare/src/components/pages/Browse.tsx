import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store';
import { findPlaylists, getUserPlaylists } from '../../store/modules/playlists';

import { PlaylistResponseDto } from '../../rxjs-api';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { useViewPlaylistById } from '../../hooks/NavigationHooks';
import { withGlobalStateConsumer } from '../../core/globalState';

import { RefreshControl, ScrollView } from 'react-native';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { List, Text, Button } from 'react-native-paper';
import { SceneMap, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PageContainer, KeyboardAvoidingPageContent, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/MediaCard';
import { PlaylistsComponent } from './Playlists';

import { filterUnique } from '../../utils';
import styles, { theme } from '../../styles';
import { createRandomRenderKey } from '../../core/utils';

export interface BrowseProps {
  list: PlaylistResponseDto[];
  onViewDetailClicked: Function;
}

export const SharedArticles = () => {
  const { sharedItems } = useAppSelector((state) => state?.user);
  const [isLoaded, setIsLoaded] = useState(false);
  // TODO: We're converting to set to filter out dupes, fix the actual issue, this is just a temporary workaround
  // const list = filterUnique(sharedItems, 'title') || [];

  let sortedList = sharedItems.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));
  // sortedList = sortedList.filter((item) => item.mediaIds.length > 0);

  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <List.Section>
        <List.Subheader>Latest Articles</List.Subheader>
      </List.Section>
    </ScrollView>
  );
};

export const SharedList = () => {
  const { sharedItems } = useAppSelector((state) => state?.user);
  // TODO: We're converting to set to filter out dupes, fix the actual issue, this is just a temporary workaround
  const list = filterUnique(sharedItems, 'title') || [];

  let sortedList = list.map((item) => {
    // const { mediaIds, description } = item;
    // const itemDescription = `${shortenText(description, 40)}\n${mediaIds.length || 0} videos`;
    // Hack to set playlist id as we're just casting a SharedItemDto to a PlaylistDto
    return (Object.assign({}, item, { _id: item.playlistId }) as unknown) as PlaylistResponseDto;
  });

  // console.log(`SharedList > Dumping sortedList: ${JSON.stringify(sortedList, null, 2)}`);
  // sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));
  // sortedList = sortedList.filter((item) => item.mediaIds.length > 0);

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item.playlistId });

  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <PlaylistsComponent list={sortedList} onViewDetailClicked={viewPlaylist} />
    </ScrollView>
  );
};
export const SharedBlock = () => {
  const randomKey = createRandomRenderKey();
  const { sharedItems } = useAppSelector((state) => state?.user);
  const list = filterUnique(sharedItems, 'playlistId') || [];
  let sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item.playlistId });

  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <List.Section>
        {sortedList.map((item) => {
          // @ts-ignore
          const { playlistId, title, description, author, imageSrc, sharedCount, sharesCount, likesCount } = item;
          return (
            <View key={`shared_block_${randomKey}_${playlistId}`} style={{ padding: 0, paddingTop: 0 }}>
              <MediaCard
                elevation={1}
                title={title}
                author={author}
                description={description}
                category={'General'}
                tags={['General']}
                thumbnail={imageSrc}
                showSocial={true}
                showActions={false}
                showThumbnail={true}
                shares={sharesCount}
                views={sharedCount}
                likes={likesCount}
              >
                <Button
                  icon="live-tv"
                  color={theme.colors.primary}
                  mode="contained"
                  style={{ width: '100%', marginBottom: 10 }}
                  compact
                  dark
                  onPress={() => viewPlaylist(item)}
                >
                  Watch Now
                </Button>
              </MediaCard>
            </View>
          );
        })}
      </List.Section>
    </ScrollView>
  );
};

const renderScene = SceneMap({
  list: SharedList,
  // grid: SharedGrid,
  block: SharedBlock,
  // articles: SharedArticles,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Browse = ({ globalState }: PageProps) => {
  const layout = useWindowDimensions();

  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'list', title: '', icon: 'view-list' },
    { key: 'block', title: '', icon: 'article' },
    // { key: 'grid', title: '', icon: 'apps' },
  ]);

  const onRefresh = useCallback(refresh, [dispatch]);
  const [prevSearchFilters, setPrevSearchFilters] = useState({ filters: { text: '' } });

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const currentSearchFilters = globalState?.search;
    if (!isLoaded || currentSearchFilters !== prevSearchFilters) {
      setPrevSearchFilters(currentSearchFilters);
      loadData();
    }
  }, [isLoaded, globalState]);

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
                onPress={() => setIndex(i)}
              >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons
                    name={route.icon}
                    color={props.navigationState.index === i ? theme.colors.text : theme.colors.disabled}
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
    const { search } = globalState;
    const args = { text: search?.filters?.text ? search.filters.text : '' };
    // console.log(`Browse.loadData > Dispatch with args: ${JSON.stringify(args, null, 2)}`);
    // console.log(globalState);
    if (search.filters.text) {
      // console.log('Dispatch findPlaylists');
      await dispatch(findPlaylists(args));
    } else {
      // console.log('Dispatch getUserPlaylists');
      await dispatch(getUserPlaylists({}));
    }
    setIsLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    const { search } = globalState;
    const args = { text: search?.filters?.text ? search.filters.text : '' };
    // console.log(`Playlists.refresh > Dispatch with args: ${JSON.stringify(args, null, 2)}`);
    // console.log(globalState);
    if (search.filters.text) {
      // console.log('Dispatch findPlaylists');
      await dispatch(findPlaylists(args));
    } else {
      // console.log('Dispatch getUserPlaylists');
      await dispatch(getUserPlaylists({}));
    }
    setRefreshing(false);
  }
};

export default withLoadingSpinner(withGlobalStateConsumer(Browse));
