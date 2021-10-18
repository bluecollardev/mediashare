import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useAppSelector } from '../../state';
import { getUserPlaylists, shareUserPlaylist } from '../../state/modules/playlists';
import { loadUsers } from '../../state/modules/users';

import { useGoBack, useRouteName } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ActionButtons } from '../layout/ActionButtons';
import { ContactList } from '../layout/ContactList';
import { PageContainer, PageContent, PageActions, PageProps } from '../layout/PageContainer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ShareWith = ({}: PageProps) => {
  const dispatch = useDispatch();
  const [loaded, setIsLoaded] = useState(false);

  const loadData = async function () {
    await dispatch(getUserPlaylists({}));
  };

  const goBack = useGoBack();
  const viewPlaylists = useRouteName(ROUTES.playlists);
  const actionCb = async function () {
    await dispatch(
      shareUserPlaylist({
        userIds: selectedUsers,
        playlistIds: playlists.map((playlist) => playlist._id),
      })
    );
    setIsLoaded(false);

    viewPlaylists();
  };
  const users = useAppSelector((state) => state.users.entities);
  const playlists = useAppSelector((state) => state.userPlaylists.selected);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const updateSelectedUsers = function (bool: boolean, userId: string) {
    const filtered = bool ? selectedUsers.concat([userId]) : selectedUsers.filter((item) => item._id !== userId);
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
        <ContactList contacts={users} showGroups={true} selectable={true} onChecked={updateSelectedUsers} />
      </PageContent>
      <PageActions>
        <ActionButtons cancelCb={goBack} actionCb={actionCb} actionLabel="Confirm" cancelLabel="Cancel" rightIcon="check-circle" />
      </PageActions>
    </PageContainer>
  );
};

export default withLoadingSpinner(ShareWith);
