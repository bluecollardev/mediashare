import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { removeShareItem, readShareItem } from '../../state/modules/share-items';
import { loadProfile } from '../../state/modules/profile';

import { useRouteWithParams, useViewPlaylistById } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { FAB, Divider } from 'react-native-paper';
import { PageActions, PageContainer, PageContent, PageProps } from '../layout/PageContainer';
import { AccountCard } from '../layout/AccountCard';
import { SharedList } from '../layout/SharedList';
import { ActionButtons } from '../layout/ActionButtons';

import { filterUnique } from '../../utils';

import { theme } from '../../styles';

interface ProfileProps extends PageProps {}

const actionModes = { delete: 'delete', default: 'default' };

const Profile = ({ route }: ProfileProps) => {
  const { userId } = route.params;
  const [loaded, setLoaded] = useState(false);
  // const userId = '6149b54a19531dd4c6b0df59';
  const dispatch = useDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const isAdmin = userRole === 'admin';
  const accountEdit = useRouteWithParams(ROUTES.accountEdit);
  const profile = useAppSelector((state) => state.profile.entity);

  const { firstName, lastName, email, phoneNumber, imageSrc, sharedItems = [], likesCount, sharesCount, sharedCount } = profile || {};

  const [isSelectable, setIsSelectable] = useState(false);
  const [actionMode, setActionMode] = useState(actionModes.default);

  const viewPlaylist = useViewPlaylistById();

  const onDelete = function (itemId: string) {
    from(dispatch(removeShareItem(itemId))).subscribe(() => {
      setLoaded(false);
    });
  };

  const onView = function (playlistId: string, shareItemId: string) {
    dispatch(readShareItem(shareItemId));
    setLoaded(false);
    viewPlaylist({ playlistId });
  };

  useEffect(() => {
    from(dispatch(loadProfile({ userId })))
      .pipe(take(1))
      .subscribe(() => {
        setLoaded(true);
      });
  }, [loaded, dispatch]);

  const fullName = firstName || lastName ? `${firstName} ${lastName}` : 'Unnamed User';
  // TODO: We're converting to set to filter out dupes, fix the actual issue, this is just a temporary workaround
  const uniqueSharedItems = filterUnique(sharedItems, 'title') || [];

  const [fabState, setFabState] = useState({ open: false });
  const fabActions = [
    // { icon: 'person-remove', onPress: () => {}, color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.primary } },
    { icon: 'rule', onPress: () => activateUnshareMode(), color: theme.colors.primaryTextLighter, style: { backgroundColor: theme.colors.accentDarker } },
  ];

  const [clearSelectionKey, setClearSelectionKey] = useState(Math.random());
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
      <SharedList onDelete={onDelete} onView={onView} sharedItems={uniqueSharedItems} selectable={isSelectable} showActions={!isSelectable} />
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
          color={theme.colors.primaryTextLighter}
          fabStyle={{ backgroundColor: fabState.open ? theme.colors.error : theme.colors.primary }}
          onStateChange={(open) => {
            setFabState(open);
          }}
        />
      )}
    </PageContainer>
  );

  async function confirmPlaylistsToUnshare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function cancelPlaylistsToUnshare() {
    setActionMode(actionModes.default);
    clearCheckboxSelection();
    setIsSelectable(false);
  }

  async function activateUnshareMode() {
    setActionMode(actionModes.delete);
    setIsSelectable(true);
  }

  function clearCheckboxSelection() {
    const randomKey = Math.random();
    setClearSelectionKey(randomKey);
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  text: {
    color: theme.colors.primaryTextLighter,
  },
  listContainer: {
    padding: 15,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    justifyContent: 'center',
    marginLeft: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  sharedItemCard: {
    width: '100%',
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.success,
    color: theme.colors.primaryTextLighter,
    // padding: 5,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

export default withLoadingSpinner(Profile);
