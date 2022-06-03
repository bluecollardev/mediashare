import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator as createBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { store, useAppSelector } from './store';
import { routeConfig } from './routes';
import { useUser } from 'mediashare/hooks/useUser';
import { theme } from './styles';
import { useFonts } from 'expo-font';

import { createBottomTabListeners } from './screenListeners';
import { GlobalStateProps, withGlobalStateProvider } from './core/globalState';

import Login from './components/pages/Login';
import Browse from './components/pages/Browse';
import MediaItemAdd from './components/pages/MediaItemAdd';
import AddFromFeed from './components/pages/AddFromFeed';
import Playlists from './components/pages/Playlists';
import PlaylistDetail from './components/pages/PlaylistDetail';
import PlaylistEdit from './components/pages/PlaylistEdit';
import PlaylistAdd from './components/pages/PlaylistAdd';
import AddToPlaylist from './components/pages/AddToPlaylist';
import Media from './components/pages/Media';
import MediaItemDetail from './components/pages/MediaItemDetail';
import MediaItemEdit from './components/pages/MediaItemEdit';
import PlaylistItemEdit from './components/pages/PlaylistItemEdit';
import ShareWith from './components/pages/ShareWith';
import Account from './components/pages/Account';
import AccountEdit from './components/pages/AccountEdit';
import Profile from './components/pages/Profile';

// const deviceWidth = Dimensions.get('window').width;

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
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistItemEdit} component={PlaylistItemEdit} />
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
      <MediaStackNavigator.Screen {...routeConfig.mediaItemAdd} component={MediaItemAdd} />
    </MediaStackNavigator.Navigator>
  );
};

const AccountStackNavigator = createStackNavigator();
const AccountNavigation = () => {
  const user = useUser();

  return (
    <AccountStackNavigator.Navigator initialRouteName={user?.firstName ? 'Account' : 'accountEdit'}>
      <AccountStackNavigator.Screen {...routeConfig.account} component={Account} />
      <AccountStackNavigator.Screen {...routeConfig.profile} component={Profile} />
      <AccountStackNavigator.Screen {...routeConfig.accountEdit} component={AccountEdit} initialParams={{ userId: null }} />
      <AccountStackNavigator.Screen {...routeConfig.mediaItemEdit} component={MediaItemEdit} />
      <AccountStackNavigator.Screen {...routeConfig.playlistDetail} component={PlaylistDetail} />
      <AccountStackNavigator.Screen {...routeConfig.playlistEdit} component={PlaylistEdit} />
      <AccountStackNavigator.Screen {...routeConfig.addItemsToPlaylist} component={AddToPlaylist} />
    </AccountStackNavigator.Navigator>
  );
};

/* Public and Private navigation routes are split here */
const PublicStackNavigator = createStackNavigator();
const PublicMainNavigation = () => {
  return (
    <PublicStackNavigator.Navigator initialRouteName="Login">
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

interface PrivateMainNavigationProps {
  globalState: GlobalStateProps;
}

function PrivateMainNavigation({ globalState }: PrivateMainNavigationProps) {
  const { user, build } = globalState;
  const navigationTabListeners = createBottomTabListeners(globalState);
  return (
    <PrivateNavigator.Navigator
      initialRouteName="Account"
      activeColor={theme.colors.text}
      inactiveColor={theme.colors.primary}
      barStyle={{ backgroundColor: theme.colors.background }}
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
        <PrivateNavigator.Screen name="Browse" component={BrowseNavigation} listeners={navigationTabListeners} />
      )}

      {(build.forSubscriber || build.forAdmin) && (
        <PrivateNavigator.Screen name="Playlists" component={PlaylistsNavigation} listeners={navigationTabListeners} />
      )}

      {build.forAdmin && <PrivateNavigator.Screen name="Media" component={MediaNavigation} listeners={navigationTabListeners} />}

      <PrivateNavigator.Screen name="Account" component={AccountNavigation} listeners={navigationTabListeners} initialParams={{ userId: user?._id }} />
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

async function clearLogin() {
  await Auth.signOut();
  await Auth.currentCredentials();
}

clearLogin().then();

const PublicMainNavigationWithGlobalState = withGlobalStateProvider(PublicMainNavigation);
const PrivateMainNavigationWithGlobalState = withGlobalStateProvider(PrivateMainNavigation);

function App() {
  const [fontsLoaded] = useFonts({
    'CircularStd-Black': require('./assets/fonts/CircularStd-Black.otf'),
    'CircularStd-Bold': require('./assets/fonts/CircularStd-Bold.otf'),
    'CircularStd-Medium': require('./assets/fonts/CircularStd-Medium.otf'),
    'CircularStd-Book': require('./assets/fonts/CircularStd-Book.otf'),
    'CircularStd-Light': require('./assets/fonts/CircularStd-Light.otf'),
  });

  // Amplify.configure(awsmobile);
  // clearLogin();

  // This is disabled until I figure out what causes the session to be wack
  // useEffect(() => {
  //   const checkToken = async function () {
  //     const storedToken = await getKeyPair('token');
  //     if (storedToken) {
  //       const user = await dispatch(validateTokenAction(storedToken));
  //     }
  //   };
  //   checkToken();
  // }, []);

  const loading = useAppSelector((state) => state?.app?.loading);
  const { isLoggedIn } = useUser();

  const customTheme = { ...theme };
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
              <PrivateMainNavigationWithGlobalState />
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <PublicMainNavigationWithGlobalState />
            </NavigationContainer>
          )}
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
