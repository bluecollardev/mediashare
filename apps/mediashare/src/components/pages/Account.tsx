import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SceneMap, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { loadUser, logout } from '../../state/modules/user';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { findMediaItems, getMediaItemById } from '../../state/modules/media-items';
import { loadUsers } from '../../state/modules/users';

import { View, useWindowDimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, FAB, Title, Text } from 'react-native-paper';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouteName, useEditMediaItem } from '../../hooks/NavigationHooks';
import { PageContainer, PageProps } from '../layout/PageContainer';
import { MediaListItem } from '../layout/MediaListItem';
import AccountCard from '../layout/AccountCard';

import { shortenText } from '../../utils';

import { theme } from '../../styles';

const Contacts = () => {
  const manageContact = useRouteName(ROUTES.user);
  const users = useAppSelector((state) => state.users.entities);
  console.log('Dumping users');
  console.log(users);
  return (
    <ScrollView>
      {users.map((user) => {
        const { _id, username = '', firstName = '', lastName = '', email = '', imageSrc = '' } = user;
        return (
          <MediaListItem
            key={`user_${_id}`}
            title={`${firstName} ${lastName}`}
            description={`${username} <${email}>`}
            showThumbnail={true}
            image={imageSrc}
            iconRight="edit"
            iconRightColor={theme.colors.accentDarker}
            selectable={true}
            onViewDetail={() => manageContact()}
          />
        );
      })}
    </ScrollView>
  );
};

const SharedItems = () => {
  // const dispatch = useDispatch();
  // const viewMediaItem = useEditMediaItem();
  const mediaItems = useAppSelector((state) => state.user.mediaItems) || [];
  /* const onViewMediaItem = async function (mediaId: string, uri: string) {
    await dispatch(getMediaItemById({ uri, mediaId }));
    viewMediaItem({ mediaId, uri });
  }; */
  return (
    <ScrollView
      contentInset={{ bottom: 120 }}
      contentContainerStyle={{ flex: 1, backgroundColor: theme.colors.background, flexDirection: 'row', flexWrap: 'wrap' }}
    >
      {mediaItems.length > 0 ? (
        mediaItems.map((item) => {
          return (
            <Card key={`item_${item._id}`} style={{ flexBasis: '50%', padding: 5 }}>
              <Card.Title title={item.title} titleStyle={{ fontSize: 14 }} subtitle={`${shortenText(item.description, 40)}`} />
              <Card.Cover source={{ uri: item.thumbnail }} />
            </Card>
          );
        })
      ) : (
        <Title>No Items</Title>
      )}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  contacts: Contacts,
  shared: SharedItems,
});

export const Account = ({}: PageProps) => {
  const layout = useWindowDimensions();
  const editProfile = useRouteName(ROUTES.accountEdit);
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [routes] = React.useState([
    { key: 'contacts', title: 'Contacts', icon: 'assignment-ind' },
    { key: 'shared', title: 'All Shared Items', icon: 'movie' },
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
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                  name={route.icon}
                  color={props.navigationState.index === i ? theme.colors.primaryText : theme.colors.disabled}
                  size={26}
                  style={{ marginRight: 10 }}
                />
                <Text style={{ fontWeight: 'bold' }}>{route.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const dispatch = useDispatch();

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primaryDarker } },
    { icon: 'edit', onPress: () => editProfile(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  const { firstName = 'Lucas', lastName = 'Lopatka', email, phoneNumber } = user;
  return (
    <PageContainer>
      <AccountCard title={`${firstName} ${lastName}`} email={email} phoneNumber={phoneNumber} image={user.imageSrc} likes={49} shared={30} shares={300} />
      {/* <Highlights highlights={state.highlights} /> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => _renderTabBar(props)}
        initialLayout={{ width: layout.width, height: layout.height }}
      />
      <FAB.Group
        visible={true}
        open={fabState.open}
        icon={fabState.open ? 'close' : 'more-vert'}
        actions={fabActions}
        color={theme.colors.primaryTextLighter}
        fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
        onStateChange={(open) => {
          // open && setOpen(!open);
          setFabState(open);
        }}
      />
    </PageContainer>
  );

  async function accountLogout() {
    await dispatch(logout());
  }
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
