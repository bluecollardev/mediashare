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
  Explore: 'earth',
  Playlists: 'play-circle-outline',
  Media: 'video-account',
  // Feeds: 'share-social-outline',
  Account: 'account-settings-outline',
};

const TabNavigator = createBottomTabNavigator();

function TabNavigation() {
  return (
    <TabNavigator.Navigator
      initialRouteName={'Playlists'}
      activeColor={theme.colors.primaryTextLighter}
      inactiveColor={theme.colors.accentLighter}
      barStyle={{ backgroundColor: theme.colors.accent }}
      labeled={false}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabBarIcon: ({ focused, color }) => {
          return <MaterialCommunityIcons name={tabNavigationIconsMap[route.name]} color={color} size={26} />;

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

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    setIsLoggedIn(user._id.length > 0);
  }, [user]);

  const customTheme = {
    ...theme,
    fonts: {
      medium: { fontFamily: 'Roboto_500Medium', fontWeight: '500' as const },

      light: { fontFamily: 'Roboto_300Light', fontWeight: '300' as const },

      regular: { fontFamily: 'Roboto_500Medium', fontWeight: '400' as const },
      thin: { fontFamily: 'Roboto_100Thin', fontWeight: '100' as const },
    },
  };

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider theme={customTheme}>
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
