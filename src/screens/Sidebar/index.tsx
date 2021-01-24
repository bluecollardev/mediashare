import * as React from 'react';
import { Text, Container, List, ListItem, View } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';

const routes = [
  {
    route: 'Home',
    caption: 'Home'
  },
  {
    route: 'Explore',
    caption: 'Explore'
  },
  {
    route: 'Playlists',
    caption: 'Playlists'
  },
  {
    route: 'PlaylistDetail',
    caption: 'Playlist Detail'
  },
  {
    route: 'AddFromLibrary',
    caption: 'Add From Library'
  },
  {
    route: 'PlaylistEdit',
    caption: 'Edit Playlist'
  },
  {
    route: 'Library',
    caption: 'Library'
  },
  {
    route: 'LibraryItemEdit',
    caption: 'Edit Item'
  },
  {
    route: 'LibraryItemDetail',
    caption: 'Preview Item'
  },
  {
    route: 'AddFromFeed',
    caption: 'Add From Feed'
  },
  {
    route: 'ShareWith',
    caption: 'Share With User'
  },
  /* {
    route: 'BlankPage',
    caption: 'Blank Page'
  }, */
  /* {
    route: 'ListPage',
    caption: 'List Page'
  }, */
  {
    route: 'Settings',
    caption: 'Settings'
  },
  {
    route: 'Login',
    caption: 'Logout'
  }
];

export interface SidebarProps {
  navigation: any;
}

export interface SidebarState {}

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })]
});
export default class Sidebar extends React.Component<
  SidebarProps,
  SidebarState
> {
  render() {
    return (
      <Container>
        <View>
          <List
            style={{ marginTop: 40 }}
            dataArray={routes}
            keyExtractor={(item, idx) => idx.toString()}
            renderRow={(data) => {
              return (
                <ListItem
                  // key={`item-${idx}`}
                  button
                  onPress={() => {
                    data.route === 'Login'
                      ? this.props.navigation.dispatch(resetAction)
                      : this.props.navigation.navigate(data.route);
                  }}>
                  <Text>{data.caption}</Text>
                </ListItem>
              );
            }}
          />
        </View>
      </Container>
    );
  }
}
