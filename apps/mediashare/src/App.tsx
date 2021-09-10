/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator as createBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Provider as PaperProvider } from 'react-native-paper';
import { routeConfig } from './routes';
import LoginContainer from './components/pages/Login';

import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { Provider } from 'react-redux';
import { store } from './boot/configureStore';
import { useAppSelector } from './state/index';
import { theme } from './styles';

declare const global: { HermesInternal: null | {} };

// const deviceWidth = Dimensions.get('window').width;
// const DrawerNavigator = createDrawerNavigator();

const ExploreStackNavigator = createStackNavigator();
const ExploreNavigation = () => {
  return (
    <ExploreStackNavigator.Navigator>
      <ExploreStackNavigator.Screen {...routeConfig.explore} />
      <ExploreStackNavigator.Screen {...routeConfig.sharedPlaylistDetail} />
      <ExploreStackNavigator.Screen {...routeConfig.sharedItemDetail} />
    </ExploreStackNavigator.Navigator>
  );
};

const PlaylistsStackNavigator = createStackNavigator();
function PlaylistsNavigation() {
  return (
    <PlaylistsStackNavigator.Navigator>
      <PlaylistsStackNavigator.Screen {...routeConfig.playlists} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistDetail} />

      <PlaylistsStackNavigator.Screen {...routeConfig.playlistAdd} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addItemsToPlaylist} />

      <PlaylistsStackNavigator.Screen {...routeConfig.libraryItemDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addFromLibrary} />
      <PlaylistsStackNavigator.Screen {...routeConfig.shareWith} />
    </PlaylistsStackNavigator.Navigator>
  );
}

const LibraryStackNavigator = createStackNavigator();
function LibraryNavigation() {
  return (
    <LibraryStackNavigator.Navigator>
      <LibraryStackNavigator.Screen {...routeConfig.library} />
      <LibraryStackNavigator.Screen {...routeConfig.libraryItemDetail} />
      <LibraryStackNavigator.Screen {...routeConfig.addFromFeed} />
      <LibraryStackNavigator.Screen {...routeConfig.libraryItemEdit} />
      <LibraryStackNavigator.Screen {...routeConfig.addMedia} />
    </LibraryStackNavigator.Navigator>
  );
}
const PageStackNavigator = createStackNavigator();

const AccountStackNavigator = createStackNavigator();
const AccountNavigation = () => {
  return (
    <AccountStackNavigator.Navigator>
      <AccountStackNavigator.Screen {...routeConfig.account} />
    </AccountStackNavigator.Navigator>
  );
};

// Map route names to icons
export const tabNavigationIconsMap = {
  Explore: 'earth',
  Playlists: 'play-circle-outline',
  Library: 'video-account',
  // Feeds: 'share-social-outline',
  Account: 'account-settings-outline',
};

const TabNavigator = createBottomTabNavigator();

function TabNavigation() {
  return (
    <TabNavigator.Navigator
      initialRouteName={'playlists'}
      barStyle={{ backgroundColor: '#fff' }}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabBarIcon: ({ focused, color, size }) => {
          return <MaterialCommunityIcons name={tabNavigationIconsMap[route.name]} color={color} size={26} />;

          // <Icon name={tabNavigationIconsMap[route.name]} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false,
      }}
    >
      <TabNavigator.Screen name={'Explore'} component={ExploreNavigation} />
      <TabNavigator.Screen name={'Playlists'} component={PlaylistsNavigation} />
      <TabNavigator.Screen name={'Library'} component={LibraryNavigation} />
      {/* <TabNavigator.Screen name={'Feeds'} component={null} />*/}
      <TabNavigator.Screen name={'Account'} component={AccountNavigation} />
    </TabNavigator.Navigator>
  );
}
Amplify.configure(awsmobile);
async function fakeLogin() {
  await Auth.signOut();
  await Auth.currentCredentials();
}
fakeLogin().then();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  // Amplify.configure(awsmobile);
  // fakeLogin();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsLoggedIn(user._id.length > 0);
  }, [user]);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        {isLoggedIn ? (
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        ) : (
          <LoginContainer />
        )}
      </PaperProvider>
    </Provider>
  );
}
export default App;
