import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator as createBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { routeConfig } from './routes';

import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { useAppSelector } from './store';
import { theme } from './styles';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black, useFonts } from '@expo-google-fonts/roboto';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ProfileDto } from './rxjs-api';

import * as build from './build';
import { bottomTabListeners } from './screenListeners';
import { withGlobalStateProvider } from './core/globalState';

import Login from './components/pages/Login';
import Browse from './components/pages/Browse';
import AddFromCollection from './components/pages/AddFromCollection';
import AddMedia from './components/pages/AddMedia';
import AddFromFeed from './components/pages/AddFromFeed';
import Playlists from './components/pages/Playlists';
import PlaylistDetail from './components/pages/PlaylistDetail';
import PlaylistEdit from './components/pages/PlaylistEdit';
import PlaylistAdd from './components/pages/PlaylistAdd';
import AddToPlaylist from './components/pages/AddToPlaylist';
import Media from './components/pages/Media';
import MediaItemDetail from './components/pages/MediaItemDetail';
import MediaItemEdit from './components/pages/MediaItemEdit';
import ShareWith from './components/pages/ShareWith';
import Account from './components/pages/Account';
import User from './components/pages/User';
import AccountEdit from './components/pages/AccountEdit';
import Profile from './components/pages/Profile';

// const deviceWidth = Dimensions.get('window').width;
// const DrawerNavigator = createDrawerNavigator();

const BrowseStackNavigator = createStackNavigator();
const BrowseNavigation = () => {
  return (
    <BrowseStackNavigator.Navigator>
      <BrowseStackNavigator.Screen {...routeConfig.browse} component={Browse} />
      <BrowseStackNavigator.Screen {...routeConfig.playlistDetail} component={PlaylistDetail} />
      <BrowseStackNavigator.Screen {...routeConfig.mediaItemDetail} component={MediaItemDetail} />
      <BrowseStackNavigator.Screen {...routeConfig.shareWith} component={ShareWith} />
    </BrowseStackNavigator.Navigator>
  );
};
const PlaylistsStackNavigator = createStackNavigator();

const PlaylistsNavigation = () => {
  return (
    <PlaylistsStackNavigator.Navigator>
      <PlaylistsStackNavigator.Screen {...routeConfig.playlists} component={Playlists} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistDetail} component={PlaylistDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistAdd} component={PlaylistAdd} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addItemsToPlaylist} component={AddToPlaylist} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistEdit} component={PlaylistEdit} />
      <PlaylistsStackNavigator.Screen {...routeConfig.mediaItemDetail} component={MediaItemDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.mediaItemEdit} component={MediaItemEdit} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addFromMedia} component={AddFromCollection} />
      <PlaylistsStackNavigator.Screen {...routeConfig.shareWith} component={ShareWith} />
    </PlaylistsStackNavigator.Navigator>
  );
};

const MediaStackNavigator = createStackNavigator();

const MediaNavigation = () => {
  return (
    <MediaStackNavigator.Navigator>
      <MediaStackNavigator.Screen {...routeConfig.media} component={Media} />
      <MediaStackNavigator.Screen {...routeConfig.mediaItemDetail} component={MediaItemDetail} />
      <MediaStackNavigator.Screen {...routeConfig.addFromFeed} component={AddFromFeed} />
      <MediaStackNavigator.Screen {...routeConfig.mediaItemEdit} component={MediaItemEdit} />
      <MediaStackNavigator.Screen {...routeConfig.addMedia} component={AddMedia} />
    </MediaStackNavigator.Navigator>
  );
};

const AccountStackNavigator = createStackNavigator();
const AccountNavigation = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <AccountStackNavigator.Navigator initialRouteName={user.firstName ? 'Account' : 'accountEdit'}>
      <AccountStackNavigator.Screen {...routeConfig.account} component={Account} />
      <AccountStackNavigator.Screen {...routeConfig.profile} component={Profile} />
      <AccountStackNavigator.Screen {...routeConfig.accountEdit} component={AccountEdit} initialParams={{ userId: null }} />
      <AccountStackNavigator.Screen {...routeConfig.user} component={User} />
      <AccountStackNavigator.Screen {...routeConfig.mediaItemEdit} component={MediaItemEdit} />
      <AccountStackNavigator.Screen {...routeConfig.playlistDetail} component={PlaylistDetail} />
      <AccountStackNavigator.Screen {...routeConfig.playlistEdit} component={PlaylistEdit} />
      <AccountStackNavigator.Screen {...routeConfig.addItemsToPlaylist} component={AddToPlaylist} />
    </AccountStackNavigator.Navigator>
  );
};

/* Public and Private navigation routes are split here */

const PublicStackNavigator = createStackNavigator();
const PublicNavigation = () => {
  return (
    <PublicStackNavigator.Navigator initialRouteName={'Login'}>
      <PublicStackNavigator.Screen {...routeConfig.login} component={Login} />
    </PublicStackNavigator.Navigator>
  );
};

// Map route names to icons
export const tabNavigationIconsMap = {
  Browse: 'explore',
  Playlists: 'play-circle-outline',
  Media: 'video-library',
  // Feeds: 'share-social-outline',
  Account: 'account-box',
};

const PrivateNavigator = createBottomTabNavigator();
function PrivateNavigation({ user }: { user: Partial<ProfileDto> } = { user: {} }) {
  return (
    <PrivateNavigator.Navigator
      initialRouteName={'Account'}
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
    >
      {(build.forFreeUser || build.forSubscriber || build.forAdmin) && (
        <PrivateNavigator.Screen
          name={'Browse'}
          component={BrowseNavigation}
          listeners={bottomTabListeners}
        />
      )}

      {(build.forSubscriber || build.forAdmin) && (
        <PrivateNavigator.Screen
          name={'Playlists'}
          component={PlaylistsNavigation}
          listeners={bottomTabListeners}
        />
      )}

      {build.forAdmin && (
        <PrivateNavigator.Screen
          name={'Media'}
          component={MediaNavigation}
          listeners={bottomTabListeners}
        />
      )}
      <PrivateNavigator.Screen name={'Account'} component={AccountNavigation} initialParams={{ userId: user._id }} />
    </PrivateNavigator.Navigator>
  );
}

Amplify.configure({
  ...awsmobile,
  // Fix AWS Pinpoint connection issues
  Analytics: {
    disabled: true,
  },
});

async function fakeLogin() {
  await Auth.signOut();
  await Auth.currentCredentials();
}

fakeLogin().then();

const PublicNavigationWithGlobalState = withGlobalStateProvider(PublicNavigation);
const PrivateNavigationWithGlobalState = withGlobalStateProvider(PrivateNavigation);

function App() {
  console.info('rendering app...');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  // TODO: Fix font loading on Android
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_900Black,
    Roboto_700Bold,
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
  });
  // const fontsLoaded = true;
  // Amplify.configure(awsmobile);
  // fakeLogin();

  const loading = useAppSelector((state) => state.app.loading);

  const user = useAppSelector((state) => state.user);

  /* This is disabled until I figure out what causes the session to be wack
   */
  // useEffect(() => {
  //   const checkToken = async function () {
  //     const storedToken = await getKeyPair('token');
  //     if (storedToken) {
  //       const user = await dispatch(validateTokenAction(storedToken));
  //     }
  //   };
  //   checkToken();
  // }, []);
  useEffect(() => {
    setIsLoggedIn(user?._id?.length > 0);
  }, [user]);

  const customTheme = {
    ...theme,
  };

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <>
        <Spinner visible={loading} />
        <PaperProvider
          theme={customTheme}
          settings={{
            icon: (props) => <MaterialIcons {...props} />,
          }}
        >
          {isLoggedIn ? (
            <NavigationContainer>
              <PrivateNavigationWithGlobalState user={user} />
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <PublicNavigationWithGlobalState />
            </NavigationContainer>
          )}
        </PaperProvider>
      </>
    );
  }
}

export default App;
