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
// import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';

import { routeConfig } from './routes';
import { RootState } from './state';
import LoginContainer from './container/LoginContainer';
import { LoginContext, UserContext } from './state/user-context';
import { DefaultApi, LoginResponseDto, MediaItemsApi, PlaylistsApi, ShareItemsApi, UserApi, UsersApi } from './rxjs-api';
import Amplify, { Auth, Storage } from 'aws-amplify';
import awsmobile from './aws-exports';
import { ApiService } from './state/apis';
import { ApiContext } from './state/api-context';
import { Provider } from 'react-redux';
import { store } from './boot/configureStore';
import { useAppSelector } from './state/index';

declare const global: { HermesInternal: null | {} };

// const deviceWidth = Dimensions.get('window').width;
// const DrawerNavigator = createDrawerNavigator();

const ExploreStackNavigator = createStackNavigator();
const ExploreNavigation = () => {
  return (
    <ExploreStackNavigator.Navigator>
      <ExploreStackNavigator.Screen {...routeConfig.explore} />
      <ExploreStackNavigator.Screen {...routeConfig.playlistDetail} />
      <ExploreStackNavigator.Screen {...routeConfig.libraryItemDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addFromLibrary} />
    </ExploreStackNavigator.Navigator>
  );
};

const PlaylistsStackNavigator = createStackNavigator();
const PlaylistsNavigation = () => {
  return (
    <PlaylistsStackNavigator.Navigator>
      <PlaylistsStackNavigator.Screen {...routeConfig.playlists} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistEdit} />
      <PlaylistsStackNavigator.Screen {...routeConfig.libraryItemDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addFromLibrary} />
      <PlaylistsStackNavigator.Screen {...routeConfig.shareWith} />
    </PlaylistsStackNavigator.Navigator>
  );
};

const LibraryStackNavigator = createStackNavigator();
const LibraryNavigation = () => {
  return (
    <LibraryStackNavigator.Navigator>
      <LibraryStackNavigator.Screen {...routeConfig.library} />
      <LibraryStackNavigator.Screen {...routeConfig.libraryItemDetail} />
      <LibraryStackNavigator.Screen {...routeConfig.libraryItemEdit} />
      <LibraryStackNavigator.Screen {...routeConfig.addFromFeed} />
      {/* TODO: Add to playlist! */}
      <LibraryStackNavigator.Screen {...routeConfig.addToPlaylist} />
    </LibraryStackNavigator.Navigator>
  );
};

const SettingsStackNavigator = createStackNavigator();
const SettingsNavigation = () => {
  return (
    <SettingsStackNavigator.Navigator>
      <SettingsStackNavigator.Screen {...routeConfig.settings} />
    </SettingsStackNavigator.Navigator>
  );
};

// Map route names to icons
export const tabNavigationIconsMap = {
  Explore: 'earth-outline',
  Playlists: 'play-circle-outline',
  Library: 'film-outline',
  Feeds: 'share-social-outline',
  Settings: 'settings-outline',
};

const TabNavigator = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <TabNavigator.Navigator
      initialRouteName={'Playlists'}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabBarIcon: ({ focused, color, size }) => {
          return <Icon name={tabNavigationIconsMap[route.name]} color={color} />;
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
      <TabNavigator.Screen name={'Settings'} component={SettingsNavigation} />
    </TabNavigator.Navigator>
  );
};

async function fakeLogin() {
  await Auth.currentCredentials();
}
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  Amplify.configure(awsmobile);
  fakeLogin();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsLoggedIn(user._id.length > 0);
  }, [user]);
  // setIsLoggedIn(!!useSelector);
  // store.subscribe(() => {
  //   const state = store.getState();
  //   if (state.user._id.length) {
  //     console.log(state);
  //     setIsLoggedIn(true);
  //   }

  // });

  return (
    <Provider store={store}>
      {/* <UserContext.Provider value={{ isLoggedIn, setUser }}> */}
      {isLoggedIn ? (
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      ) : (
        <LoginContainer />

        // </UserContext.Provider>
      )}
      {/* </UserContext.Provider> */}
    </Provider>
  );
};
export default App;

function mapDispatchToProps(dispatch: any) {
  return {};
}

const mapStateToProps = (state: RootState) => ({
  ...state,
});

// export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
