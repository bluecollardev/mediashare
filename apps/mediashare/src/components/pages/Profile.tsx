import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'mediashare/store';
import { removeShareItem, readShareItem } from 'mediashare/store/modules/share-items';
import { loadProfile } from 'mediashare/store/modules/profile';
import { useViewPlaylistById } from 'mediashare/hooks/NavigationHooks';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { FAB, Divider } from 'react-native-paper';
import {
  PageActions,
  PageContainer,
  PageProps,
  AccountCard,
  SharedList,
  ActionButtons,
  AppDialog
} from 'mediashare/components/layout';
// import { filterUnique } from 'mediashare/utils';
import { createRandomRenderKey } from 'mediashare/core/utils';
import { theme } from 'mediashare/styles';

interface ProfileProps extends PageProps {}

const actionModes = { delete: 'delete', default: 'default' };

const Profile = ({ route }: ProfileProps) => {
  const { userId } = route.params;
  // const [loaded, setLoaded] = useState(false);
  // const userId = '6149b54a19531dd4c6b0df59';
  const dispatch = useDispatch();
  // const userRole = useAppSelector((state) => state.user.role);
  // const isAdmin = userRole === 'admin';
  // const accountEdit = useRouteWithParams(routeNames.accountEdit);
  const profile = useAppSelector((state) => {
    return state.profile.entity;
  });

  const { firstName, lastName, email, phoneNumber, imageSrc, sharedItems = [], likesCount, sharesCount, sharedCount } = profile || {};

  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const viewPlaylist = useViewPlaylistById();

  useEffect(() => {
    dispatch(loadProfile(userId));
  }, [userId]);

  const fullName = firstName || lastName ? `${firstName} ${lastName}` : 'Unnamed User';
  // TODO: We're converting to set to filter out dupes, fix the actual issue, this is just a temporary workaround
  // const uniqueSharedItems = filterUnique(sharedItems, 'shareItemId') || [];

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  const [showUnshareDialog, setShowUnshareDialog] = useState(false);
  const [showUnshareItemDialog, setShowUnshareItemDialog] = useState(false);
  const [itemToUnshare, setItemToUnshare] = useState(undefined as string);

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    // { icon: 'person-remove', onPress: () => {}, color: theme.colors.text, styles: { backgroundColor: theme.colors.primary } },
    { icon: 'rule', onPress: () => activateUnshareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.error } },
  ];

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
      <AppDialog
        leftActionLabel="Cancel"
        rightActionLabel="Revoke Access"
        leftActionCb={() => closeUnshareItemDialog()}
        rightActionCb={() => confirmItemToUnshare()}
        onDismiss={closeUnshareItemDialog}
        showDialog={showUnshareItemDialog}
        title="Revoke Access"
        subtitle="Are you sure you want to do this? This action is final and cannot be undone."
      />
      <AccountCard
        title={fullName}
        email={email}
        phoneNumber={phoneNumber}
        image={imageSrc}
        likes={likesCount}
        shares={sharesCount}
        shared={sharedCount}
        showSocial={true}
        showActions={!isSelectable}
        isCurrentUser={false}
      />
      {/* isAdmin && (
          <Button mode="outlined" styles={{ margin: 15 }} onPress={() => accountEdit({ userId: profile._id })}>
            Edit Profile
          </Button>
        ) */}
      <Divider />
      <SharedList
        key={clearSelectionKey}
        selectable={isSelectable}
        showActions={!isSelectable}
        onDelete={openUnshareItemDialog}
        onView={viewItem}
        sharedItems={sharedItems}
        onChecked={updateSelection}
      />
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
            setFabState(open);
          }}
        />
      )}
    </PageContainer>
  );

  async function viewItem(playlistId: string, shareItemId: string) {
    await dispatch(readShareItem(shareItemId));
    await viewPlaylist({ playlistId });
  }

  function openUnshareItemDialog(shareItemId: string) {
    setItemToUnshare(shareItemId);
    setShowUnshareItemDialog(true);
  }

  function closeUnshareItemDialog() {
    setItemToUnshare(undefined);
    setShowUnshareItemDialog(false);
  }

  async function confirmItemToUnshare() {
    await unshareItem(itemToUnshare);
    closeUnshareItemDialog();
  }

  async function unshareItem(shareItemId: string) {
    await dispatch(removeShareItem(shareItemId));
    await dispatch(loadProfile(userId));
  }

  async function activateUnshareMode() {
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

  async function cancelItemsToUnshare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function unshareItems() {
    selectedItems.map(async (shareItemId) => {
      await unshareItem(shareItemId);
    }); // TODO: Find a real way to do this
    setTimeout(async () => {
      await dispatch(loadProfile(userId));
    }, 2500);
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

export default withLoadingSpinner(undefined)(Profile);

const styles = StyleSheet.create({
  deleteActionButton: {
    backgroundColor: theme.colors.error,
  },
});
