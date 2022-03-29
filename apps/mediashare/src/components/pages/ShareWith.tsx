import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { routeNames } from '@app/routes';

import { useAppSelector } from '@app/store';
import { getUserPlaylists, shareUserPlaylist } from '@app/store/modules/playlists';
import { loadUsers } from '@app/store/modules/users';

import { useGoBack, useRouteName } from '@app/hooks/NavigationHooks';
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
  const viewPlaylists = useRouteName(routeNames.playlists);

  const users = useAppSelector((state) => state.users.entities);
  const playlists = useAppSelector((state) => state.userPlaylists.selected);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const actionCb = async () => {
    await dispatch(
      shareUserPlaylist({
        userIds: selectedUsers,
        // @ts-ignore
        playlistIds: playlists.map((playlist) => playlist._id),
      })
    );
    setIsLoaded(false);

    viewPlaylists();
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
  }, [loaded]);

  return (
    <PageContainer>
      <PageContent>
        <ContactList contacts={users} showGroups={true} selectable={true} onChecked={updateSelectedUsers} />
      </PageContent>
      <PageActions>
        <ActionButtons onCancelClicked={goBack} onActionClicked={actionCb} actionLabel="Confirm" />
      </PageActions>
    </PageContainer>
  );

  function updateSelectedUsers(bool: boolean, userId: string) {
    const filtered = bool ? selectedUsers.concat([userId]) : selectedUsers.filter((item) => item._id !== userId);
    setSelectedUsers(filtered);
  }
};

export default withLoadingSpinner(undefined)(ShareWith);
