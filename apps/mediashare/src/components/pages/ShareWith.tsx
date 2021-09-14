import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { useGoBack, useRouteName } from '../../hooks/NavigationHooks';
import { UserDto } from '../../rxjs-api';

import { useAppSelector } from '../../state';
import { findUserPlaylists, shareUserPlaylist } from '../../state/modules/playlists';
import { loadUsers } from '../../state/modules/users';

import { ScrollView, View } from 'react-native';
import { ActionButtons } from '../layout/ActionButtons';
import { ContactList } from '../layout/ContactList';
import { PageContainer } from '../layout/PageContainer';
import { useSpinner } from '../../hooks/useSpinner';

export interface ShareWithContainerProps {
  navigation: any;
}

const ShareWith = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
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
    setLoaded(false);

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
      setLoaded(true);
    }
  }, [loaded, dispatch]);

  useEffect(() => {
    if (!loaded) {
      loadData().then(() => setLoaded(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <PageContainer>
      <ScrollView>
        <View>
          <ContactList showGroups={true} items={users} onChecked={updateSelectedUsers} />
        </View>
      </ScrollView>
      <View>
        <ActionButtons cancelCb={goBack} actionCb={actionCb} actionLabel="Share" cancelLabel="Cancel" />
      </View>
    </PageContainer>
  );
};

export default ShareWith;
