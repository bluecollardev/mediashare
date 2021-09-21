import React, { useEffect, useState } from 'react';

import { loadUser, logout } from '../../state/modules/user';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View, useWindowDimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { PageContainer, PageProps } from '../layout/PageContainer';

import { useRouteName } from '../../hooks/NavigationHooks';
import { ROUTES } from '../../routes';
import { useDispatch } from 'react-redux';
import { SceneMap, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../styles';
import { findMediaItems } from '../../state/modules/media-items/index';
import AccountCard from '../layout/AccountCard';
import { loadUsers } from '../../state/modules/users';
import { useAppSelector } from '../../state';

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: theme.colors.background }} />;

const SecondRoute = () => {
  const users = useAppSelector((state) => state.users.entities);
  console.log(users);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, flexDirection: 'row', flexWrap: 'wrap' }}>
      {users.map((user) => {
        return (
          <Card style={{ flexBasis: '50%', padding: 5 }}>
            <Card.Cover source={{ uri: user.imageSrc || 'https://res.cloudinary.com/baansaowanee/image/upload/v1632212064/default_avatar_lt0il8.jpg' }} />
          </Card>
        );
      })}
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export const Account = ({ navigation }: PageProps) => {
  const onManageContactsClicked = useRouteName(ROUTES.contacts);
  const layout = useWindowDimensions();
  const editProfile = useRouteName(ROUTES.accountEdit);
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [routes] = React.useState([
    { key: 'first', title: 'First', icon: 'movie' },
    { key: 'second', title: 'Second', icon: 'assignment-ind' },
  ]);

  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    async function loadData() {
      await dispatch(findMediaItems());
      await dispatch(loadUsers());
      await dispatch(loadUser());
      setIsLoaded(true);
    }
    if (!isLoaded) {
      loadData().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const _renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity style={props.navigationState.index === i ? styles.tabItemActive : styles.tabItem} onPress={() => setIndex(i)}>
              <MaterialIcons name={route.icon} color={props.navigationState.index === i ? theme.colors.primaryText : theme.colors.disabled} size={26} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const dispatch = useDispatch();

  // const loginRoute = usePageRoute(ROUTES.login);

  const onSignoutClicked = () => {
    dispatch(logout());
    // loginRoute();
  };

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';

  return (
    <PageContainer>
      <AccountCard
        image={user.imageSrc}
        likes={49}
        shared={30}
        shares={300}
        title={`${user.firstName} ${user.lastName}`}
        company={user.email}
        contact={user.phoneNumber}
      />
      {/* <Highlights highlights={state.highlights} /> */}
      <Button mode={'outlined'} style={{ margin: 15 }} onPress={editProfile}>
        Edit Profile
      </Button>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => _renderTabBar(props)}
        initialLayout={{ width: layout.width, height: layout.height }}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderBottomColor: theme.colors.disabled,
    borderBottomWidth: 1,
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderBottomColor: theme.colors.primaryText,
    borderBottomWidth: 1,
  },
});
export default withLoadingSpinner(Account);
