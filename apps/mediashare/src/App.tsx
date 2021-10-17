import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator as createBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { routeConfig } from './routes';

import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './aws-exports';
import { Provider } from 'react-redux';
import { store } from './boot/configureStore';
import { useAppSelector } from './state';
import { theme } from './styles';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, Roboto_900Black, useFonts } from '@expo-google-fonts/roboto';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ProfileDto } from './rxjs-api';

import * as build from './build';
import { bottomTabListeners } from './screenListeners';
import { withGlobalStateProvider } from './core/globalState';

// const deviceWidth = Dimensions.get('window').width;
// const DrawerNavigator = createDrawerNavigator();

const BrowseStackNavigator = createStackNavigator();
const BrowseNavigation = () => {
  return (
    <BrowseStackNavigator.Navigator>
      <BrowseStackNavigator.Screen {...routeConfig.browse} />
      <BrowseStackNavigator.Screen {...routeConfig.playlistDetail} />
      <BrowseStackNavigator.Screen {...routeConfig.mediaItemDetail} />
      <BrowseStackNavigator.Screen {...routeConfig.shareWith} />
    </BrowseStackNavigator.Navigator>
  );
};
const PlaylistsStackNavigator = createStackNavigator();

const PlaylistsNavigation = () => {
  return (
    <PlaylistsStackNavigator.Navigator>
      <PlaylistsStackNavigator.Screen {...routeConfig.playlists} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistAdd} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addItemsToPlaylist} />
      <PlaylistsStackNavigator.Screen {...routeConfig.playlistEdit} />
      <PlaylistsStackNavigator.Screen {...routeConfig.mediaItemDetail} />
      <PlaylistsStackNavigator.Screen {...routeConfig.mediaItemEdit} />
      <PlaylistsStackNavigator.Screen {...routeConfig.addFromMedia} />
      <PlaylistsStackNavigator.Screen {...routeConfig.shareWith} />
    </PlaylistsStackNavigator.Navigator>
  );
};

const MediaStackNavigator = createStackNavigator();

const MediaNavigation = () => {
  return (
    <MediaStackNavigator.Navigator>
      <MediaStackNavigator.Screen {...routeConfig.media} />
      <MediaStackNavigator.Screen {...routeConfig.mediaItemDetail} />
      <MediaStackNavigator.Screen {...routeConfig.addFromFeed} />
      <MediaStackNavigator.Screen {...routeConfig.mediaItemEdit} />
      <MediaStackNavigator.Screen {...routeConfig.addMedia} />
    </MediaStackNavigator.Navigator>
  );
};

const AccountStackNavigator = createStackNavigator();
const AccountNavigation = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <AccountStackNavigator.Navigator initialRouteName={user.firstName ? 'Account' : 'accountEdit'}>
      <AccountStackNavigator.Screen {...routeConfig.account} />
      <AccountStackNavigator.Screen {...routeConfig.profile} />
      <AccountStackNavigator.Screen {...routeConfig.accountEdit} initialParams={{ userId: null }} />
      <AccountStackNavigator.Screen {...routeConfig.user} />
      <AccountStackNavigator.Screen {...routeConfig.mediaItemEdit} />
      <AccountStackNavigator.Screen {...routeConfig.playlistDetail} />
      <AccountStackNavigator.Screen {...routeConfig.playlistEdit} />
      <AccountStackNavigator.Screen {...routeConfig.addItemsToPlaylist} />
    </AccountStackNavigator.Navigator>
  );
};

/* Public and Private navigation routes are split here */

const PublicStackNavigator = createStackNavigator();
const PublicNavigation = () => {
  return (
    <PublicStackNavigator.Navigator initialRouteName={'Login'}>
      <PublicStackNavigator.Screen {...routeConfig.login} />
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

Amplify.configure(awsmobile);

async function fakeLogin() {
  await Auth.signOut();
  await Auth.currentCredentials();
}

fakeLogin().then();

const PublicNavigationWithGlobalState = withGlobalStateProvider(PublicNavigation);
const PrivateNavigationWithGlobalState = withGlobalStateProvider(PrivateNavigation);

function App() {
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
              <PrivateNavigationWithGlobalState user={user} />
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <PublicNavigationWithGlobalState />
            </NavigationContainer>
          )}
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
