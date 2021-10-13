import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { logout } from '../../state/modules/user';
import { loadUsers } from '../../state/modules/users';
import { loadProfile } from '../../state/modules/profile';
import { findMediaItems } from '../../state/modules/media-items';

import { View, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native';
import { FAB, Text } from 'react-native-paper';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { useRouteName, useRouteWithParams, useViewPlaylistById, useViewProfileById } from '../../hooks/NavigationHooks';
import { PageContainer, PageActions, PageProps } from '../layout/PageContainer';
import { ContactList } from '../layout/ContactList';
import { ActionButtons } from '../layout/ActionButtons';
import { AccountCard } from '../layout/AccountCard';

import styles, { theme } from '../../styles';

import * as build from '../../build';
import { SharedList } from '../layout/SharedList';
import { readShareItem } from '../../state/modules/share-items';

const Contacts = ({ selectable = false, showActions = false }) => {
  const manageContact = useRouteName(ROUTES.user);
  const contacts = useAppSelector((state) => state.users.entities);
  const viewProfileById = useViewProfileById();

  return contacts ? (
    <ScrollView>
      <ContactList
        contacts={contacts}
        showGroups={false}
        showActions={showActions}
        onViewDetail={viewProfileById}
        selectable={selectable}
        listItemProps={{
          iconRight: 'visibility',
          iconRightColor: theme.colors.accentDarker,
          onViewDetail: () => manageContact(),
        }}
      />
    </ScrollView>
  ) : null;
};

const SharedItems = () => {
  const dispatch = useDispatch();
  const viewPlaylist = useViewPlaylistById();
  const { sharedItems = [] } = useAppSelector((state) => state?.profile?.entity);

  const onView = function (playlistId: string, shareItemId: string) {
    dispatch(readShareItem(shareItemId));
    viewPlaylist({ playlistId });
  };

  return <SharedList sharedItems={sharedItems} onView={onView} />;
};

const renderScene = (sceneComponentProps) => ({ route }) => {
  switch (route.key) {
    case 'contacts':
      return <Contacts {...sceneComponentProps} />;
    case 'shared':
      return <SharedItems {...sceneComponentProps} />;
  }
};

const actionModes = { delete: 'delete', default: 'default' };

export const Account = ({}: PageProps) => {
  const layout = useWindowDimensions();
  const editProfile = useRouteWithParams(ROUTES.accountEdit);
  const [index, setIndex] = useState(0);
  // const { setLoaded, onView, onDelete } = useProfile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);

  const tabs = [{ key: 'contacts', title: 'My Contacts', icon: 'group' }];
  // TODO: We don't want to do this it makes routing too crazy!
  /* if (build.forAdmin) {
    tabs.push({ key: 'shared', title: 'All Shared Items', icon: 'movie' });
  } */

  const [routes] = React.useState(tabs);

  const user = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      loadData().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const [fabState, setFabState] = useState({ open: false });
  let fabActions = [];
  if (build.forFreeUser) {
    fabActions = [
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
    ];
  } else if (build.forSubscriber) {
    fabActions = [
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
    ];
  } else if (build.forAdmin) {
    fabActions = [
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
      { icon: 'person-remove', onPress: () => activateDeleteMode(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
    ];
  }

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const { firstName, lastName, email, phoneNumber, likesCount, sharesCount, sharedCount } = user;

  const fullName = firstName || lastName ? `${firstName} ${lastName}` : 'Unnamed User';

  return (
    <PageContainer>
      <AccountCard
        title={fullName}
        email={email}
        phoneNumber={phoneNumber}
        image={user.imageSrc}
        showSocial={true}
        likes={likesCount}
        shared={sharedCount}
        shares={sharesCount}
      />
      {/* <Highlights highlights={state.highlights} /> */}
      {!build.forFreeUser && (
        <TabView
          key={clearSelectionKey}
          navigationState={{ index, routes }}
          renderScene={renderScene({ selectable: isSelectable, showActions: !isSelectable })}
          onIndexChange={setIndex}
          renderTabBar={(props) => renderTabBar(props)}
          initialLayout={{ width: layout.width, height: layout.height }}
        />
      )}
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons actionCb={confirmDelete} cancelCb={cancelDelete} actionLabel="Delete" cancelLabel="Cancel" rightIcon="delete" />
        </PageActions>
      )}
      {!isSelectable && (
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
      )}
    </PageContainer>
  );

  async function loadData() {
    await dispatch(findMediaItems());
    await dispatch(loadUsers());
    await dispatch(loadProfile({}));
    setIsLoaded(true);
  }

  async function accountLogout() {
    await dispatch(logout());
  }

  async function activateDeleteMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  async function confirmDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function cancelDelete() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function clearCheckboxSelection() {
    const randomKey = Math.random();
    setClearSelectionKey(randomKey);
  }

  function renderTabBar(props) {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={`tab_${i}-${route.name}`}
              style={props.navigationState.index === i ? styles.tabItemActive : styles.tabItem}
              onPress={() => setIndex(i)}
            >
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
  }
};

export default withLoadingSpinner(Account);
