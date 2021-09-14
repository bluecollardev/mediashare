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
import { createMaterialBottomTabNavigator as createBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { routeConfig } from './routes';
import LoginContainer from './components/pages/Login';

import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { Provider } from 'react-redux';
import { store } from './boot/configureStore';
import { useAppSelector } from './state/index';
import { theme } from './styles';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black, useFonts } from '@expo-google-fonts/roboto';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistEdit} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistItemDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.mediaItemDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addFromMedia} />
      <PlaylistsStackNavigator.Screen {...routeConfig.shareWith} />
    </PlaylistsStackNavigator.Navigator>
  );
}

const MediaStackNavigator = createStackNavigator();

function MediaNavigation() {
  return (
    <MediaStackNavigator.Navigator>
      <MediaStackNavigator.Screen {...routeConfig.media} />
      <MediaStackNavigator.Screen {...routeConfig.mediaItemDetail} />
      <MediaStackNavigator.Screen {...routeConfig.addFromFeed} />
      <MediaStackNavigator.Screen {...routeConfig.mediaItemEdit} />
      <MediaStackNavigator.Screen {...routeConfig.addMedia} />
    </MediaStackNavigator.Navigator>
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
  Explore: 'explore',
  Playlists: 'play-circle-outline',
  Media: 'video-library',
  // Feeds: 'share-social-outline',
  Account: 'account-box',
};

const TabNavigator = createBottomTabNavigator();

function TabNavigation() {
  return (
    <TabNavigator.Navigator
      initialRouteName={'Media'}
      activeColor={theme.colors.primaryTextLighter}
      inactiveColor={theme.colors.accentLighter}
      barStyle={{ backgroundColor: theme.colors.accent }}
      labeled={false}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabBarIcon: ({ focused, color }) => {
          return <MaterialIcons name={tabNavigationIconsMap[route.name]} color={color} size={26} />;

          // <Icon name={tabNavigationIconsMap[route.name]} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false,
        tabBarColor: theme.colors.accent,
      }}
    >
      <TabNavigator.Screen name={'Explore'} component={ExploreNavigation} />
      <TabNavigator.Screen name={'Playlists'} component={PlaylistsNavigation} />
      <TabNavigator.Screen name={'Media'} component={MediaNavigation} />
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_900Black,
    Roboto_700Bold,
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
  });
  // Amplify.configure(awsmobile);
  // fakeLogin();

  const loading = useAppSelector((state) => state.app.loading);

  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    setIsLoggedIn(user._id.length > 0);
  }, [user]);

  const customTheme = {
    ...theme,
  };

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <Provider store={store}>
        <Spinner visible={loading} />

        <PaperProvider
          theme={customTheme}
          settings={{
            icon: (props) => <MaterialIcons {...props} />,
          }}
        >
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
}

export default App;
