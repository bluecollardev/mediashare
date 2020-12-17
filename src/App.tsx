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
/* import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native'; */

import { View, Text } from 'react-native';

// import { Dimensions } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';

declare const global: { HermesInternal: null | {} };

// const deviceWidth = Dimensions.get('window').width;

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

/* import Login from './container/LoginContainer';
import Home from './container/HomeContainer';
import BlankPage from './container/BlankPageContainer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Sidebar from './container/SidebarContainer';

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
  },
  {
    drawerWidth: deviceWidth - 50,
    drawerPosition: 'left',
    contentComponent: (props: any) => {
      return null; // (<Sidebar {...props} />)
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    BlankPage: { screen: BlankPage },
    Drawer: { screen: Drawer }
  },
  {
    initialRouteName: 'Home',
    // headerMode: 'none'
  }
);*/

export default createAppContainer(AppNavigator);
