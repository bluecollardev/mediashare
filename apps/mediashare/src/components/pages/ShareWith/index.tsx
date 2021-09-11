import { Container, Content, Text, View } from 'native-base';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGoBack, useRouteName } from '../../../hooks/NavigationHooks';
import { ROUTES } from '../../../routes';
import { UserDto } from '../../../rxjs-api';
import { useAppSelector } from '../../../state';
import { shareUserPlaylist } from '../../../state/modules/playlists';
import { loadUsers } from '../../../state/modules/users';
import styles from '../../../styles';
import { ActionButtons } from '../../layout/ActionButtons';
import { ContactList } from '../../layout/ContactList';

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
  const [loaded, setLoaded] = React.useState(false);
  const actionCb = async function () {
    console.log('submitting');
    console.log('playlists', playlists);
    const res = await dispatch(
      shareUserPlaylist({
        userIds: selectedUsers.map((user) => user._id),
        playlistIds: playlists.map((playlist) => playlist._id),
      })
    );
    console.log(res);
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
