import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as R from 'remeda';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import Config from '../../config';

import { routeNames } from '../../routes';

import { useAppSelector } from '../../store';
import { thumbnailRoot } from '../../store/modules/media-items/key-factory';
import { fetchAndPutToS3 } from '../../store/modules/media-items/storage';
import { loadUser, logout, updateAccount } from '../../store/modules/user';
import { loadUsers } from '../../store/modules/users';
import { loadProfile } from '../../store/modules/profile';
import { findMediaItems } from '../../store/modules/media-items';
import { readShareItem } from '../../store/modules/share-items';

import { withGlobalStateConsumer } from '../../core/globalState';

import { View, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native';
import { FAB, Text, Divider } from 'react-native-paper';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { useRouteWithParams, useViewPlaylistById, useViewProfileById } from '../../hooks/NavigationHooks';
import { PageContainer, PageActions, PageProps } from '../layout/PageContainer';
import { ContactList } from '../layout/ContactList';
import { ActionButtons } from '../layout/ActionButtons';
import { AccountCard } from '../layout/AccountCard';
import { SharedList } from '../layout/SharedList';

import * as build from '../../build';

import { createRandomRenderKey } from '../../core/utils';

import styles, { theme } from '../../styles';

const Contacts = ({ selectable = false, showActions = false }) => {
  // const manageContact = useRouteName(routeNames.user);
  const viewProfileById = useViewProfileById();

  const contacts = useAppSelector((state) => state.users.entities);
  return contacts ? (
    <ScrollView>
      <ContactList contacts={contacts} showGroups={false} showActions={showActions} onViewDetail={viewProfileById} selectable={selectable} />
    </ScrollView>
  ) : null;
};

const SharedItems = () => {
  const dispatch = useDispatch();
  const viewPlaylist = useViewPlaylistById();
  const { sharedItems = [] } = useAppSelector((state) => state?.profile?.entity);

  const onView = function (playlistId: string, shareItemId: string) {
    dispatch(readShareItem(shareItemId));
    viewPlaylist({ playlistId }).then();
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

const awsUrl = Config.AWS_URL;

export const Account = ({ globalState }: PageProps) => {
  const viewAccount = useRouteWithParams(routeNames.account);
  const editProfile = useRouteWithParams(routeNames.accountEdit);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  // const { setLoaded, onView, onDelete } = useProfile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);

  const tabs = [{ key: 'contacts', title: 'Subscribers / Followers', icon: 'group' }];
  // TODO: We don't want to do this it makes routing too crazy!
  /* if (build.forAdmin) {
    tabs.push({ key: 'shared', title: 'All Shared Items', icon: 'movie' });
  } */

  const [routes] = React.useState(tabs);

  const user = useAppSelector((state) => state.user);
  const userId = user?._id || null;
  const [state, setState] = useState(R.pick(user, ['firstName', 'email', 'lastName', 'phoneNumber', 'imageSrc']));

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
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  } else if (build.forSubscriber) {
    fabActions = [
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  } else if (build.forAdmin) {
    fabActions = [
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
      { icon: 'person-remove', onPress: () => activateDeleteMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  }

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
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
        likes={likesCount}
        shared={sharedCount}
        shares={sharesCount}
        showSocial={true}
        showActions={false}
        isCurrentUser={true}
        onProfileImageClicked={() => getDocument()}
      />
      <Divider />
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
          <ActionButtons onActionClicked={confirmDelete} onCancelClicked={cancelDelete} actionLabel="Delete" />
        </PageActions>
      )}
      {!isSelectable && (
        <FAB.Group
          visible={true}
          open={fabState.open}
          icon={fabState.open ? 'close' : 'more-vert'}
          actions={fabActions}
          color={theme.colors.text}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.default : theme.colors.primary }}
          onStateChange={(open) => {
            // open && setOpen(!open);
            setFabState(open);
          }}
        />
      )}
    </PageContainer>
  );

  async function loadData() {
    const { search } = globalState;
    const args = { text: search?.filters?.text ? search.filters.text : '' };
    await dispatch(findMediaItems(args));
    await dispatch(loadUsers());
    // @ts-ignore
    const profile = (await dispatch(loadProfile(userId))) as any;
    setState(profile.payload);
    setIsLoaded(true);
    setIsLoaded(true);
  }

  async function getDocument() {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5, maxWidth: 400, maxHeight: 400 }, function (res) {
      if (!res.assets) {
        return;
      }
      const image = res.assets[0];
      const thumbnailKey = thumbnailRoot + image.fileName;
      fetchAndPutToS3({ key: thumbnailKey, fileUri: image.uri, options: { contentType: image.type } }).then((res: { key: string }) => {
        // eslint-disable-next-line no-shadow
        const image = awsUrl + res.key;
        setState({ ...state, imageSrc: image });
      });
    });
  }

  function save() {
    const updateUserDto = state;
    // @ts-ignore
    from(dispatch(updateAccount({ updateUserDto, userId })))
      .pipe(
        // @ts-ignore
        switchMap(() => dispatch(loadProfile(userId))),
        // @ts-ignore
        switchMap(() => dispatch(loadUser())),
        take(1)
      )
      .subscribe(() => viewAccount({ userId }));
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
    const randomKey = createRandomRenderKey();
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
                  color={props.navigationState.index === i ? theme.colors.text : theme.colors.disabled}
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

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(Account));
