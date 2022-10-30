import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// TODO: Replace this when we're ready
// import { createMaterialBottomTabNavigator as createBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialBottomTabNavigator as createBottomTabNavigator } from 'mediashare/lib/material-bottom-tabs';
import { Provider as PaperProvider, Text, Card } from 'react-native-paper';
import { View, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Amplify, { Hub } from 'aws-amplify';
import awsmobile from './aws-exports';
import { store, useAppSelector } from './store';
import { routeConfig } from './routes';
import { useUser } from 'mediashare/hooks/useUser';
import { theme } from './styles';
import { useFonts } from 'expo-font';

import { createBottomTabListeners } from './screenListeners';
import { GlobalStateProps, withGlobalStateProvider } from './core/globalState';

import Login from './components/pages/Login';
import SignUp from './components/pages/authentication/SignUp';
import Confirm from './components/pages/authentication/ConfirmCode';
import ResetPassword from './components/pages/authentication/ResetPassword';
import Feed from './components/pages/Feed';
import FeedSharedWithMe from './components/pages/SharedWithMe';
import MediaItemAdd from './components/pages/MediaItemAdd';
import AddFromFeed from './components/pages/AddFromFeed';
import Search from './components/pages/Search';
import Playlists from './components/pages/Playlists';
import PlaylistAdd from './components/pages/PlaylistAdd';
import PlaylistEdit from './components/pages/PlaylistEdit';
import PlaylistDetail from './components/pages/PlaylistDetail';
import PlaylistItemDetail from './components/pages/PlaylistItemDetail';
import PlaylistItemEdit from './components/pages/PlaylistItemEdit';
import AddToPlaylist from './components/pages/AddToPlaylist';
import Media from './components/pages/Media';
import MediaItemDetail from './components/pages/MediaItemDetail';
import MediaItemEdit from './components/pages/MediaItemEdit';
import ShareWith from './components/pages/ShareWith';
import Account from './components/pages/Account';
import AccountEdit from './components/pages/AccountEdit';
import Contact from './components/pages/Contact';
import SharedWithContact from './components/pages/SharedWithContact';
import SharedByContact from './components/pages/SharedByContact';
import { Auth } from 'aws-amplify';
import { loginAction } from './store/modules/user';

// Map route names to icons
export const tabNavigationIconsMap = {
  Feed: 'explore',
  Search: 'search',
  Playlists: 'play-circle-outline',
  Media: 'video-library',
};

const FeedStackNavigator = createStackNavigator();
const FeedNavigation = () => {
  return (
    <FeedStackNavigator.Navigator>
      <FeedStackNavigator.Screen {...routeConfig.feed} component={Feed} />
      <FeedStackNavigator.Screen {...routeConfig.feedSharedWithMe} component={FeedSharedWithMe} />
      <FeedStackNavigator.Screen {...routeConfig.playlistDetail} component={PlaylistDetail} />
      <FeedStackNavigator.Screen {...routeConfig.playlistItemDetail} component={PlaylistItemDetail} />
      <FeedStackNavigator.Screen {...routeConfig.mediaItemDetail} component={MediaItemDetail} />
      <FeedStackNavigator.Screen {...routeConfig.shareWith} component={ShareWith} />
    </FeedStackNavigator.Navigator>
  );
};

const SearchStackNavigator = createStackNavigator();
const SearchNavigation = () => {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen {...routeConfig.search} component={Search} />
      <SearchStackNavigator.Screen {...routeConfig.playlistDetail} component={PlaylistDetail} />
      <SearchStackNavigator.Screen {...routeConfig.mediaItemDetail} component={MediaItemDetail} />
      <SearchStackNavigator.Screen {...routeConfig.shareWith} component={ShareWith} />
    </SearchStackNavigator.Navigator>
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
    <AccountStackNavigator.Navigator initialRouteName={user?.firstName ? 'account' : 'accountEdit'}>
      <AccountStackNavigator.Screen {...routeConfig.account} component={Account} />
      <AccountStackNavigator.Screen {...routeConfig.accountEdit} component={AccountEdit} initialParams={{ userId: null }} />
      <AccountStackNavigator.Screen {...routeConfig.contact} component={Contact} />
      <AccountStackNavigator.Screen {...routeConfig.sharedByContact} component={SharedByContact} />
      <AccountStackNavigator.Screen {...routeConfig.sharedWithContact} component={SharedWithContact} />
    </AccountStackNavigator.Navigator>
  );
};

/* Public and Private navigation routes are split here */
const PublicStackNavigator = createStackNavigator();
const PublicMainNavigation = () => {
  return (
    <PublicStackNavigator.Navigator initialRouteName="login">
      <PublicStackNavigator.Screen {...routeConfig.login} component={Login} />
      <PublicStackNavigator.Screen {...routeConfig.signUp} component={SignUp} />
      <PublicStackNavigator.Screen {...routeConfig.confirm} component={Confirm} />
      <PublicStackNavigator.Screen {...routeConfig.resetPassword} component={ResetPassword} />
    </PublicStackNavigator.Navigator>
  );
};

const PrivateNavigator = createBottomTabNavigator();
interface PrivateMainNavigationProps {
  globalState: GlobalStateProps;
}
const PrivateMainNavigation = ({ globalState }: PrivateMainNavigationProps) => {
  const { build } = globalState;
  const navigationTabListeners = createBottomTabListeners(globalState);
  return (
    <PrivateNavigator.Navigator
      initialRouteName="Playlists"
      activeColor={theme.colors.text}
      inactiveColor={theme.colors.primary}
      barStyle={{ backgroundColor: theme.colors.background }}
      labeled={true}
      shifting={false}
      screenOptions={({ route }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabBarIcon:
          route.name !== 'login'
            ? ({ focused, color }) => {
                return <MaterialIcons name={tabNavigationIconsMap[route.name]} color={color} size={20} style={{ marginBottom: 5 }} />;
                // <Icon name={tabNavigationIconsMap[route.name]} color={color} />;
              }
            : undefined,
      })}
    >
      <>
        <PrivateNavigator.Screen name="Feed" component={FeedNavigation} listeners={navigationTabListeners} />

        {(build.forFreeUser || build.forSubscriber || build.forAdmin) && (
          <PrivateNavigator.Screen name="Search" component={SearchNavigation} listeners={navigationTabListeners} />
        )}

        {(build.forSubscriber || build.forAdmin) && (
          <PrivateNavigator.Screen name="Playlists" component={PlaylistsNavigation} listeners={navigationTabListeners} />
        )}

        {build.forAdmin && <PrivateNavigator.Screen name="Media" component={MediaNavigation} listeners={navigationTabListeners} />}
      </>
    </PrivateNavigator.Navigator>
  );
};

const PublicMainNavigationWithGlobalState = withGlobalStateProvider(PublicMainNavigation);
const PrivateMainNavigationWithGlobalState = withGlobalStateProvider(PrivateMainNavigation);
const AccountNavigationWithGlobalState = withGlobalStateProvider(AccountNavigation);

const RootNavigator = createStackNavigator();
const RootNavigation = ({ isCurrentUser = undefined, isLoggedIn = false }) => {
  if (isCurrentUser === undefined && !isLoggedIn) {
    return (
      <View style={{ flexGrow: 1, height: '100%', justifyContent: 'center', backgroundColor: theme.colors.background }}>
        <View
          style={{
            justifyContent: 'center',
          }}
        >
          <Card elevation={0}>
            <Card.Cover
              resizeMode="contain"
              source={require('mediashare/assets/logo/mediashare/256.png')}
              style={{ maxWidth: 150, width: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: theme.colors.background }}
            />
          </Card>
        </View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <RootNavigator.Navigator>
      {isCurrentUser ? (
        <>
          <RootNavigator.Screen name="Private" component={PrivateMainNavigationWithGlobalState} options={{ headerShown: false }} />
          <RootNavigator.Screen name="Account" component={AccountNavigationWithGlobalState} options={{ headerShown: false, presentation: 'modal' }} />
        </>
      ) : (
        <>
          <RootNavigator.Screen name="Public" component={PublicMainNavigationWithGlobalState} options={{ headerShown: false }} />
        </>
      )}
    </RootNavigator.Navigator>
  );
};

Amplify.configure({
  ...awsmobile,
  // Fix AWS Pinpoint connection issues
  Analytics: {
    disabled: true,
  },
});

function App() {
  const [fontsLoaded] = useFonts({
    'CircularStd-Black': require('./assets/fonts/CircularStd-Black.otf'),
    'CircularStd-Bold': require('./assets/fonts/CircularStd-Bold.otf'),
    'CircularStd-Medium': require('./assets/fonts/CircularStd-Medium.otf'),
    'CircularStd-Book': require('./assets/fonts/CircularStd-Book.otf'),
    'CircularStd-Light': require('./assets/fonts/CircularStd-Light.otf'),
  });

  const loading = useAppSelector((state) => state?.app?.loading);
  const { isLoggedIn } = useUser();
  const [isCurrentUser, setIsCurrentUser] = useState(undefined);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const authUser = await Auth.currentUserPoolUser({ bypassCache: true });
    await dispatch(loginAction({ accessToken: authUser.signInUserSession.accessToken.jwtToken, idToken: authUser.signInUserSession.idToken.jwtToken }));
    setIsCurrentUser(authUser);
  };

  useEffect(() => {
    let mount = true;
    fetchData().catch((error) => {
      if (mount) {
        setIsCurrentUser(null);
      }
    });
    return () => {
      setIsCurrentUser(null);
      mount = false;
    };
  }, []);

  useEffect(() => {
    Hub.listen('auth', (data) => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        fetchData().catch((error) => {
          setIsCurrentUser(null);
        });
      }
    });
    return () => {
      // @ts-ignore
      Hub.remove('auth');
    };
  }, []);

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
          <NavigationContainer>
            <RootNavigation isCurrentUser={isCurrentUser} isLoggedIn={isLoggedIn} />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
