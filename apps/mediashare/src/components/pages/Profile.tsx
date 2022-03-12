import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store';
import { removeShareItem, readShareItem } from '../../store/modules/share-items';
import { loadProfile } from '../../store/modules/profile';

import { useViewPlaylistById } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { FAB, Divider } from 'react-native-paper';
import { PageActions, PageContainer, PageProps } from '../layout/PageContainer';
import { AccountCard } from '../layout/AccountCard';
import { SharedList } from '../layout/SharedList';
import { ActionButtons } from '../layout/ActionButtons';

// import { filterUnique } from '../../utils';

import { createRandomRenderKey } from '../../core/utils';

import { theme } from '../../styles';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fullName = firstName || lastName ? `${firstName} ${lastName}` : 'Unnamed User';
  // TODO: We're converting to set to filter out dupes, fix the actual issue, this is just a temporary workaround
  // const uniqueSharedItems = filterUnique(sharedItems, 'shareItemId') || [];

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    // { icon: 'person-remove', onPress: () => {}, color: theme.colors.text, style: { backgroundColor: theme.colors.primary } },
    { icon: 'rule', onPress: () => activateUnshareMode(), color: theme.colors.text, style: { backgroundColor: theme.colors.accent } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(createRandomRenderKey());
  useEffect(() => {
    clearCheckboxSelection();
  }, []);

  return (
    <PageContainer>
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
          <Button mode="outlined" style={{ margin: 15 }} onPress={() => accountEdit({ userId: profile._id })}>
            Edit Profile
          </Button>
        ) */}
      <Divider />
      <SharedList
        selectable={isSelectable}
        showActions={!isSelectable}
        onDelete={deleteShareItem}
        onView={viewShareItem}
        sharedItems={sharedItems}
        onChecked={updateSelection}
      />
      {isSelectable && actionMode === actionModes.delete && (
        <PageActions>
          <ActionButtons
            actionCb={confirmPlaylistsToUnshare}
            cancelCb={cancelPlaylistsToUnshare}
            actionLabel="Unshare"
            cancelLabel="Cancel"
            rightIcon="delete"
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

  async function viewShareItem(playlistId: string, shareItemId: string) {
    await dispatch(readShareItem(shareItemId));
    await viewPlaylist({ playlistId });
  }

  async function deleteShareItem (shareItemId: string) {
    await dispatch(removeShareItem(shareItemId));
    await dispatch(loadProfile(userId));
  }

  async function deleteShareItems() {
    selectedItems.map(async (shareItemId) => {
      await deleteShareItem(shareItemId);
    }) // TODO: Find a real way to do this
    setTimeout(async () => {
      await dispatch(loadProfile(userId));
    }, 2500)
  }

  function updateSelection(bool: boolean, shareItemId: string) {
    const filtered = bool ? selectedItems.concat([shareItemId]) : selectedItems.filter((item) => item.shareItemId !== shareItemId);
    setSelectedItems(filtered);
  }

  async function activateUnshareMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  async function confirmPlaylistsToUnshare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
    deleteShareItems();
  }

  async function cancelPlaylistsToUnshare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  function clearCheckboxSelection() {
    const randomKey = createRandomRenderKey();
    setClearSelectionKey(randomKey);
  }
};

export default withLoadingSpinner(Profile);
