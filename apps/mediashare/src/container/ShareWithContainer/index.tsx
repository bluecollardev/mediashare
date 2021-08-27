import { Container, Content, Text, View } from 'native-base';
import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import styles from '../../screens/Home/styles';
import { useGoBack, useRouteName } from '../../hooks/NavigationHooks';
import { useEffect, useState } from 'react';
import { loadUsers } from '../../state/modules/users';
import ActionButtons from '../../components/layout/ActionButtons';
import { ContactList } from '../../components/layout/ContactList';
import { useAppSelector } from '../../state';
import { UserDto } from '../../rxjs-api/models/UserDto';
import { shareUserPlaylist } from '../../state/modules/playlists';
import { ROUTES } from '../../routes';

export interface ShareWithContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}
export interface ShareWithContainerState {}

const ShareWithContainer = () => {
  const dispatch = useDispatch();
  const goBack = useGoBack();
  const viewPlaylists = useRouteName(ROUTES.playlists);
  const [loaded, setLoaded] = useState(false);
  const actionCb = async () => {
    const res = await dispatch(shareUserPlaylist({ userIds: selectedUsers.map((user) => user._id), playlistIds: playlists.map((playlist) => playlist._id) }));
    console.log(res);
    setLoaded(false);

    viewPlaylists();
  };
  const users = useAppSelector((state) => state.users.entities);
  const playlists = useAppSelector((state) => state.playlists.selectedPlaylists);
  const [selectedUsers, setSelectedUsers] = useState([]);
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
  if (!loaded) {
    return <Text>Loading</Text>;
  }
  return (
    <Container style={styles.container}>
      <Content>
        <View>
          <ContactList showGroups={true} items={users} onChecked={updateSelectedUsers} />
        </View>
      </Content>
      <ActionButtons cancelCb={goBack} actionCb={actionCb} actionLabel="Share" cancelLabel="Cancel" />
    </Container>
  );
};

export default ShareWithContainer;
