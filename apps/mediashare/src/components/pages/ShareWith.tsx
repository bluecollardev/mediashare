import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { findUserPlaylists, shareUserPlaylist } from '../../state/modules/playlists';
import { loadUsers } from '../../state/modules/users';

import { UserDto } from '../../rxjs-api';

import { useGoBack, useRouteName } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { ContactList } from '../layout/ContactList';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';
import { useSpinner } from '../../hooks/useSpinner';
import { ContactListSelectable } from '../layout/ContactListSelectable';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ShareWith = ({}: PageProps) => {
  const dispatch = useDispatch();
  const [loaded, setIsLoaded] = useState(false);

  const [{ AppSpinner, isLoading, endLoad, startLoad }] = useSpinner({ loadingState: true });

  const loadData = async function () {
    await dispatch(findUserPlaylists({}));
  };

  const goBack = useGoBack();
  const viewPlaylists = useRouteName(ROUTES.playlists);
  const actionCb = async function () {
    await dispatch(
      shareUserPlaylist({
        userIds: selectedUsers.map((user) => user._id),
        playlistIds: playlists.map((playlist) => playlist._id),
      })
    );
    setIsLoaded(false);

    viewPlaylists();
  };
  const users = useAppSelector((state) => state.users.entities);
  const playlists = useAppSelector((state) => state.playlists.selectedPlaylists);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const updateSelectedUsers = function (bool: boolean, user: UserDto) {
    const filtered = bool ? selectedUsers.concat([user]) : selectedUsers.filter((item) => item._id !== user._id);
    setSelectedUsers(filtered);
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(loadUsers());
      setIsLoaded(true);
    }
  }, [loaded, dispatch]);

  useEffect(() => {
    if (!loaded) {
      loadData().then(() => setIsLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <PageContainer>
      <PageContent>
        <ContactListSelectable items={users} showGroups={true} onChecked={updateSelectedUsers} />
      </PageContent>
      <PageActions>
        <ActionButtons cancelCb={goBack} actionCb={actionCb} actionLabel="Confirm" cancelLabel="Cancel" rightIcon="check-circle" />
      </PageActions>
    </PageContainer>
  );
};

export default withLoadingSpinner(ShareWith);
