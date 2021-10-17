import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../state';
import { getUserPlaylists } from '../../state/modules/playlists';

import { PlaylistResponseDto } from '../../rxjs-api';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { useViewPlaylistById } from '../../hooks/NavigationHooks';

import { ScrollView } from 'react-native';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { List, Text, Button } from 'react-native-paper';
import { SceneMap, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { PageContainer, PageProps } from '../layout/PageContainer';
import { MediaCard } from '../layout/MediaCard';
import { PlaylistsComponent } from './Playlists';

import styles, { theme } from '../../styles';

export interface BrowseProps {
  list: PlaylistResponseDto[];
  onViewDetailClicked: Function;
}

const filterUnique = (arr, key) =>
  arr.reduce((acc, cur) => {
    if (!acc.find((item) => item[key] === cur[key])) {
      acc.push(cur);
    }
    return acc;
  }, []);

export const SharedArticles = () => {
  const { sharedItems } = useAppSelector((state) => state?.user);
  const [isLoaded, setIsLoaded] = useState(false);
  // TODO: We're converting to set to filter out dupes, fix the actual issue, this is just a temporary workaround
  const list = filterUnique(sharedItems, 'title') || [];

  let sortedList = list.map((item) => item);
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

  console.log(`SharedList > Dumping sortedList: ${JSON.stringify(sortedList, null, 2)}`);
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
  const { sharedItems } = useAppSelector((state) => state?.user);
  const [isLoaded, setIsLoaded] = useState(false);
  // TODO: We're converting to set to filter out dupes, fix the actual issue, this is just a temporary workaround
  const list = filterUnique(sharedItems, 'title') || [];

  let sortedList = list.map((item) => item);
  sortedList.sort((dtoA, dtoB) => (dtoA.title > dtoB.title ? 1 : -1));
  // sortedList = sortedList.filter((item) => item.mediaIds.length > 0);

  const viewPlaylistAction = useViewPlaylistById();
  const viewPlaylist = (item) => viewPlaylistAction({ playlistId: item.playlistId });

  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <List.Section>
        {sortedList.map((item) => {
          // @ts-ignore
          const { playlistId, title, description, author, imageSrc, sharedCount, sharesCount, likesCount } = item;
          return (
            <View key={`shared_block_${playlistId}`} style={{ padding: 15, paddingTop: 0 }}>
              <MediaCard
                elevation={1}
                title={title}
                author={author}
                description={description}
                category={'General'}
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
export const Browse = ({}: PageProps) => {
  const layout = useWindowDimensions();
  // Set up the loader
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'list', title: '', icon: 'view-list' },
    { key: 'block', title: '', icon: 'article' },
    // { key: 'grid', title: '', icon: 'apps' },
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
                onPress={() => setIndex(i)}
              >
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
    await dispatch(getUserPlaylists({}));
  }
};

export default withLoadingSpinner(Browse);
