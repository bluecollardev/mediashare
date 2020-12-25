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
import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Footer, FooterTab, Button, Icon } from 'native-base';
// import Icon from 'react-native-vector-icons/Ionicons';

import Login from './container/LoginContainer';
import Home from './container/HomeContainer';
import Explore from './container/ExploreContainer';
import AddFromLibrary from './container/AddFromLibraryContainer';
import AddFromFeed from './container/AddFromFeedContainer';
import Playlists from './container/PlaylistsContainer';
import PlaylistDetail from './container/PlaylistDetailContainer';
import PlaylistEdit from './container/PlaylistEditContainer';
import Library from './container/LibraryContainer';
import LibraryItemDetail from './container/LibraryItemDetailContainer';
import LibraryItemEdit from './container/LibraryItemEditContainer';
import ListPage from './container/ListPageContainer';
import BlankPage from './container/BlankPageContainer';
import Settings from './container/SettingsContainer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Sidebar from './container/SidebarContainer';

declare const global: { HermesInternal: null | {} };

const deviceWidth = Dimensions.get('window').width;

const DrawerNavigator = createDrawerNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home },
    Explore: { screen: Explore },
    Playlists: { screen: Playlists },
    PlaylistDetail: { screen: PlaylistDetail },
    AddFromLibrary: { screen: AddFromLibrary },
    PlaylistEdit: { screen: PlaylistEdit },
    Library: { screen: Library },
    LibraryItemDetail: { screen: LibraryItemDetail },
    AddFromFeed: { screen: AddFromFeed },
    LibraryItemEdit: { screen: LibraryItemEdit },
    BlankPage: { screen: BlankPage },
    ListPage: { screen: ListPage },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: 'Login',
    // headerMode: 'none',
    drawerWidth: deviceWidth - 50,
    drawerPosition: 'left',
    contentComponent: (props: any) => {
      return <Sidebar {...props} />;
    }
  }
);

/* const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    ListPage: { screen: ListPage },
    Login: { screen: Login },
    BlankPage: { screen: BlankPage }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
); */

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends React.Component {
  public navigator: any;

  render() {
    return (
      <>
        <AppContainer
          ref={(nav) => {
            this.navigator = nav;
          }}
        />
        <Footer style={{ backgroundColor: '#F8F8F8' }}>
          <FooterTab>
            <Button>
              <Icon name="earth-outline" />
            </Button>
            <Button>
              <Icon name="play-circle-outline" />
            </Button>
            <Button>
              <Icon name="film-outline" />
            </Button>
            <Button>
              <Icon name="share-social-outline" />
            </Button>
            <Button>
              <Icon name="settings-outline" />
            </Button>
          </FooterTab>
        </Footer>
      </>
    );
  }
}
