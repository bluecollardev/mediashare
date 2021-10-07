import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { logout } from '../../state/modules/user';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { findMediaItems } from '../../state/modules/media-items';
import { loadUsers } from '../../state/modules/users';

import { View, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Card, FAB, Title, Text } from 'react-native-paper';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouteName } from '../../hooks/NavigationHooks';
import { PageContainer, PageActions, PageProps } from '../layout/PageContainer';
import { ContactList } from '../layout/ContactList';
import { ActionButtons } from '../layout/ActionButtons';
import { AccountCard } from '../layout/AccountCard';

import { shortenText } from '../../utils';

import styles, { theme } from '../../styles';
import { useProfile } from '../../hooks/useProfile';
const Contacts = ({ selectable = false, showActions = false }) => {
  const manageContact = useRouteName(ROUTES.user);
  const contacts = useAppSelector((state) => state.users.entities);
  console.log('Dumping contacts');
  console.log(contacts);
  return (
    <ScrollView>
      <ContactList
        contacts={contacts}
        showGroups={false}
        showActions={showActions}
        selectable={selectable}
        listItemProps={{
          iconRight: 'edit',
          iconRightColor: theme.colors.accentDarker,
          onViewDetail: () => manageContact(),
        }}
      />
    </ScrollView>
  );
};

const SharedItems = () => {
  // const dispatch = useDispatch();
  // const viewMediaItem = useEditMediaItem();
  const mediaItems = useAppSelector((state) => state.profile.entity.sharedItems) || [];
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
            <Card key={`item_${item.playlistId}`} style={{ flexBasis: '50%', padding: 5 }}>
              <Card.Title title={item.title} titleStyle={{ fontSize: 14 }} subtitle={`${shortenText(item.author, 40)}`} />
              <Card.Cover source={{ uri: item.imageSrc }} />
            </Card>
          );
        })
      ) : (
        <Title>No Items</Title>
      )}
    </ScrollView>
  );
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
  const editProfile = useRouteName(ROUTES.accountEdit);
  const [index, setIndex] = useState(0);
  const { setLoaded, onView, onDelete } = useProfile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [routes] = React.useState([
    { key: 'contacts', title: 'Contacts', icon: 'assignment-ind' },
    { key: 'shared', title: 'All Shared Items', icon: 'movie' },
  ]);

  const user = useAppSelector((state) => state.profile.entity);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      loadData().then();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.error } },
    { icon: 'person-remove', onPress: () => activateDeleteMode(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'edit', onPress: () => editProfile(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accent } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const { firstName = 'Lucas', lastName = 'Lopatka', email, phoneNumber } = user;

  return (
    <PageContainer>
      <View>
        <AccountCard
          title={`${firstName} ${lastName}`}
          email={email}
          phoneNumber={phoneNumber}
          image={user.imageSrc}
          showSocial={true}
          likes={49}
          shared={30}
          shares={300}
        />
        {/* <Highlights highlights={state.highlights} /> */}
        <TabView
          key={clearSelectionKey}
          navigationState={{ index, routes }}
          renderScene={renderScene({ selectable: isSelectable, showActions: !isSelectable })}
          onIndexChange={setIndex}
          renderTabBar={(props) => renderTabBar(props)}
          initialLayout={{ width: layout.width, height: layout.height }}
        />
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
      </View>
    </PageContainer>
  );

  async function loadData() {
    // await dispatch(findMediaItems());
    await dispatch(loadUsers());
    // await dispatch(loadUser());
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
