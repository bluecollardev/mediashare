import React, { useEffect, useState } from 'react';

import { loadUser, logout } from '../../state/modules/user';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View, useWindowDimensions, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Avatar, Button, Card, List, Title } from 'react-native-paper';
import { PageContainer, PageProps } from '../layout/PageContainer';

import { useRouteName, useEditMediaItem, useViewProfileById } from '../../hooks/NavigationHooks';
import { ROUTES } from '../../routes';
import { useDispatch } from 'react-redux';
import { SceneMap, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../styles';
import { findMediaItems, getMediaItemById } from '../../state/modules/media-items/index';
import AccountCard from '../layout/AccountCard';
import { loadUsers } from '../../state/modules/users';
import { useAppSelector } from '../../state';
import { MediaListItem } from '../layout/MediaListItem';
import { shortenText } from '../../utils';
import { profile } from 'console';
import { loadProfile } from '../../state/modules/profile';
import { forkJoin, from, merge } from 'rxjs';
import { concat } from 'rxjs/operators';
import SharedList from '../../api/models/SharedList';
import { useProfile } from '../../hooks/useProfile';
import { User } from '../../rxjs-api';

const SecondRoute = () => {
  const dispatch = useDispatch();
  const viewMediaItem = useEditMediaItem();
  const mediaItems = useAppSelector((state) => state.mediaItems.mediaItems) || [];
  const onViewMediaItem = async function (mediaId: string, uri: string) {
    await dispatch(getMediaItemById({ uri, mediaId }));
    viewMediaItem({ mediaId, uri });
  };
  return (
    <ScrollView>
      {mediaItems.length > 0 ? (
        mediaItems.map((item) => {
          return (
            <MediaListItem
              key={`item_${item._id}`}
              title={item.title}
              description={`${shortenText(item.description, 40)}`}
              showThumbnail={true}
              image={item.thumbnail}
              iconRight="edit"
              iconRightColor={theme.colors.accentDarker}
              selectable={false}
              onViewDetail={() => onViewMediaItem(item._id, item.uri)}
            />
          );
        })
      ) : (
        <Title>No Items</Title>
      )}
    </ScrollView>
  );
};

const FirstRoute = () => {
  const onPressContact = function (contact: User) {
    console.log(contact);
  };
  const viewProfile = useViewProfileById();

  const users = useAppSelector((state) => state.users.entities);
  console.log(users);
  const renderItem = function ({ user }) {
    return (
      <Card style={{ width: '49%' }} onPress={() => viewProfile({ userId: user._id })}>
        <List.Item
          left={() => (
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
              <Avatar.Image source={user?.imageSrc ? { uri: user.imageSrc } : undefined} size={30} />
            </View>
          )}
          key={user._id}
          title={`${user.firstName} ${user.lastName}`}
          description={`${user.username}`}
        />
      </Card>
    );
  };
  return (
    <FlatList
      style={{ height: '100%' }}
      contentContainerStyle={{ justifyContent: 'space-between', width: '100%' }}
      columnWrapperStyle={{ margin: 5, justifyContent: 'space-between' }}
      numColumns={2}
      data={users}
      renderItem={({ item }) => renderItem({ user: item })}
      keyExtractor={(item) => item._id}
    />
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export const Account = ({ navigation }: PageProps) => {
  const onManageContacts = useRouteName(ROUTES.contacts);
  const layout = useWindowDimensions();
  const editProfile = useRouteName(ROUTES.accountEdit);
  const [index, setIndex] = useState(0);
  const { setLoaded, onView, onDelete } = useProfile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [routes] = React.useState([
    { key: 'first', title: 'First', icon: 'contacts' },
    { key: 'second', title: 'Second', icon: 'movie' },
  ]);

  const user = useAppSelector((state) => state.user);
  const sharedItems = useAppSelector((state) => state.profile.entity.sharedItems);
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // const loginRoute = usePageRoute(ROUTES.login);

  const onSignout = async function () {
    await dispatch(logout());
    // loginRoute();
  };
  const onViewProfile = async function () {
    await dispatch(logout());
    // loginRoute();
  };

  return (
    <View>
      <AccountCard
        image={user.imageSrc}
        likes={49}
        shared={30}
        shares={300}
        fullName={`${user.firstName} ${user.lastName}`}
        email={user.email}
        phoneNumber={user.phoneNumber}
      />
      {/* <Highlights highlights={state.highlights} /> */}
      <Button mode={'outlined'} style={{ margin: 15 }} onPress={editProfile}>
        Edit Profile
      </Button>
      {user.role === 'admin' ? (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => _renderTabBar(props)}
          initialLayout={{ width: layout.width, height: layout.height }}
        />
      ) : (
        <SharedList sharedItems={sharedItems} onView={onView} onDelete={onDelete} />
      )}
    </View>
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
