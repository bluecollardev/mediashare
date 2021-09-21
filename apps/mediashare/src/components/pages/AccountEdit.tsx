import React, { useEffect, useState } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { UserDto } from '../../rxjs-api';
import { useAppSelector } from '../../state';
import { loadUser } from '../../state/modules/user/index';
import TextField from '../form/TextField';
import PageContainer from '../layout/PageContainer';

interface AccountEditProps {}

function AccountEdit({}: AccountEditProps) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const loadData = async function () {
      const dispatched = await dispatch(loadUser());
      setIsLoaded(true);
    };
    if (!isLoaded) {
      loadData().then();
    }
  }, [isLoaded]);
  const user = useAppSelector((state) => state.user);
  const [state, setState] = useState(user);

  const onUpdate = (user: Partial<UserDto>) => {
    setState({ ...user, ...state });
  };
  return (
    <PageContainer>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <Avatar.Image source={{ uri: state._id }} />
        <Button mode={'text'}>Upload a Profile Picture</Button>
      </View>
      <ScrollView alwaysBounceVertical={false} contentContainerStyle={styles.container}>
        <TextField onChangeText={(text) => onUpdate({ firstName: text })} label={'firstName'} value={state.firstName} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ lastName: text })} label={'lastName'} value={state.lastName} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ email: text })} label={'email'} value={state.email} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ phoneNumber: text })} label={'phoneNumber'} value={state.phoneNumber} disabled={!isLoaded} />
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});

export default AccountEdit;
