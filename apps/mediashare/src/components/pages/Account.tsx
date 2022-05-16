import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import * as R from 'remeda';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import Config from 'mediashare/config';
import { routeNames } from 'mediashare/routes';
import { useAppSelector } from 'mediashare/store';
import { thumbnailRoot } from 'mediashare/core/aws/key-factory';
import { fetchAndPutToS3 } from 'mediashare/core/aws/storage';
import { loadUser, logout, updateAccount } from 'mediashare/store/modules/user';
import { loadUsers } from 'mediashare/store/modules/users';
import { loadProfile } from 'mediashare/store/modules/profile';
import { findMediaItems } from 'mediashare/store/modules/mediaItems';
import { withGlobalStateConsumer } from 'mediashare/core/globalState';
import { useWindowDimensions, ScrollView, StyleSheet } from 'react-native';
import { FAB, Divider, Card } from 'react-native-paper';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { useRouteWithParams, useViewProfileById } from 'mediashare/hooks/navigation';
import { useUser } from 'mediashare/hooks/useUser';
import {
  PageContainer,
  PageActions,
  PageProps,
  ContactList,
  ActionButtons,
  AccountCard,
  AppDialog
} from 'mediashare/components/layout';
import { createRandomRenderKey } from 'mediashare/core/utils/uuid';
import { theme } from 'mediashare/styles';

const actionModes = { delete: 'delete', default: 'default' };
const awsUrl = Config.AWS_URL;

export const Account = ({ globalState }: PageProps) => {
  const dispatch = useDispatch();

  const viewAccount = useRouteWithParams(routeNames.account);
  const editProfile = useRouteWithParams(routeNames.accountEdit);
  const viewProfileById = useViewProfileById();
  const layout = useWindowDimensions();

  const [isLoaded, setIsLoaded] = useState(false);

  const user = useUser();
  const userId = user?._id || null;
  const { firstName, lastName, email, phoneNumber, likesCount, sharesCount, sharedCount, build } = user;
  const fullName = firstName || lastName ? `${firstName} ${lastName}` : 'Unnamed User';
  const [state, setState] = useState(R.pick(user, ['firstName', 'email', 'lastName', 'phoneNumber', 'imageSrc']));

  const contacts = useAppSelector((state) => state?.users?.entities);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [showUnshareDialog, setShowUnshareDialog] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      loadData().then();
    }
  }, [isLoaded]);

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const [fabState, setFabState] = useState({ open: false });
  let fabActions = [];
  if (build.forFreeUser) {
    fabActions = [
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  } else if (build.forSubscriber) {
    fabActions = [
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
      { icon: 'person-remove', onPress: () => activateUnshareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  } else if (build.forAdmin) {
    fabActions = [
      { icon: 'logout', onPress: () => accountLogout(), color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
      { icon: 'person-remove', onPress: () => activateUnshareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
      { icon: 'edit', onPress: () => editProfile({ userId: user._id }), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
    ];
  }

  return (
    <PageContainer>
      <AppDialog
        leftActionLabel="Cancel"
        rightActionLabel="Revoke Access"
        leftActionCb={() => closeUnshareDialog()}
        rightActionCb={() => confirmItemsToUnshare()}
        onDismiss={closeUnshareDialog}
        showDialog={showUnshareDialog}
        title="Revoke Access"
        subtitle="Are you sure you want to do this? This action is final and cannot be undone."
      />
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
      <Card mode="outlined" style={styles.sectionHeader}>
        <Card.Title titleStyle={styles.sectionHeaderTitle} title="Subscribers" />
      </Card>
      {/* <Highlights highlights={state.highlights} /> */}
      {!build.forFreeUser && (
        <ScrollView style={{ width: layout.width, height: layout.height }}>
          <ContactList
            key={clearSelectionKey}
            contacts={contacts}
            showGroups={false}
            showActions={!isSelectable}
            onViewDetail={viewProfileById}
            selectable={isSelectable}
            onChecked={updateSelection}
          />
        </ScrollView>
      )}
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons
            onActionClicked={openUnshareDialog}
            onCancelClicked={cancelItemsToUnshare}
            actionLabel="Revoke Access"
            actionButtonStyles={styles.deleteActionButton}
          />
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

  function activateUnshareMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  function openUnshareDialog() {
    setShowUnshareDialog(true);
  }

  function closeUnshareDialog() {
    cancelItemsToUnshare();
    setShowUnshareDialog(false);
  }

  async function confirmItemsToUnshare() {
    await unshareItems();
    closeUnshareDialog();
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    unshareItems();
  }

  function cancelItemsToUnshare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function unshareItems() {
    selectedItems.map(async (shareItemId) => {
      // await unshareItem(shareItemId);
    }); // TODO: Find a real way to do this, using contactId
    /* setTimeout(async () => {
      await dispatch(loadProfile(userId));
    }, 2500); */
  }

  function updateSelection(bool: boolean, shareItemId: string) {
    const filtered = bool ? selectedItems.concat([shareItemId]) : selectedItems.filter((item) => item.shareItemId !== shareItemId);
    setSelectedItems(filtered);
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner(undefined)(withGlobalStateConsumer(Account));

const styles = StyleSheet.create({
  sectionHeader: {
    borderColor: 'transparent',
    marginTop: 5,
  },
  sectionHeaderTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteActionButton: {
    backgroundColor: theme.colors.error,
  },
});
