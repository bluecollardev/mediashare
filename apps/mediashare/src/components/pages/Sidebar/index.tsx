import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { Container, List, ListItem, Text, View } from 'native-base';

const routes = [
  {
    route: 'Home',
    caption: 'Home',
  },
  {
    route: 'Explore',
    caption: 'Explore',
  },
  {
    route: 'Playlists',
    caption: 'Playlists',
  },
  {
    route: 'PlaylistDetail',
    caption: 'Playlist Detail',
  },
  {
    route: 'AddFromCollection',
    caption: 'Add From Collection',
  },
  {
    route: 'PlaylistEdit',
    caption: 'Edit Playlist',
  },
  {
    route: 'Media',
    caption: 'Media',
  },
  {
    route: 'MediaItemEdit',
    caption: 'Edit Item',
  },
  {
    route: 'MediaItemDetail',
    caption: 'Preview Item',
  },
  {
    route: 'AddFromFeed',
    caption: 'Add From Feed',
  },
  {
    route: 'ShareWith',
    caption: 'Share With User',
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
    caption: 'Settings',
  },
  {
    route: 'Login',
    caption: 'Logout',
  },
];

export interface SidebarProps {
  navigation: any;
}

export interface SidebarState {}

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
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
                    data.route === 'Login' ? this.props.navigation.dispatch(resetAction) : this.props.navigation.navigate(data.route);
                  }}
                >
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

export interface SidebarContainerProps {
  navigation: any;
}

export interface SidebarContainerState {}

export default class SidebarContainer extends React.Component<SidebarContainerProps, SidebarContainerState> {
  render() {
    return <Sidebar navigation={this.props.navigation} />;
  }
}
