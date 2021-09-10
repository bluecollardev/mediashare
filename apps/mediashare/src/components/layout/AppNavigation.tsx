import { BottomTabBarProps, BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { createNavigatorFactory } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { routeConfig } from '../../routes';
import { Playlists } from '../pages/Playlists';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const AppNavigation = ({ state, navigation, descriptors }: BottomTabBarProps<BottomTabBarOptions>) => {
  const [index, setIndex] = React.useState(0);
  const routes = state.routes;

  const renderScene = BottomNavigation.SceneMap({ playlists: () => <Playlists onViewDetailClicked={() => navigation.navigate('playlists')} /> });

  return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
};

export default AppNavigation;

export const createAppNavigator = createNavigatorFactory(AppNavigation);
