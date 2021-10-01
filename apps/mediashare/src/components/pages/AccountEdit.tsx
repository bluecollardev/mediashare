import React, { useEffect, useState } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { UserDto } from '../../rxjs-api';
import { useAppSelector } from '../../state';
import { loadUser, updateAccount } from '../../state/modules/user/index';
import TextField from '../form/TextField';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import PageContainer, { PageProps } from '../layout/PageContainer';
import { launchImageLibrary } from 'react-native-image-picker';
import { fetchAndPutToS3 } from '../../state/modules/media-items/storage';
import Config from 'react-native-config';
import { thumbnailRoot } from '../../state/modules/media-items/key-factory';
import { useRouteName } from '../../hooks/NavigationHooks';
import { ROUTES } from '../../routes';
import { ActionButtons } from '../layout/ActionButtons';

const awsUrl = Config.AWS_URL;
console.log(awsUrl);

interface AccountEditProps extends PageProps {}

function AccountEdit({ startLoad, endLoad }: AccountEditProps) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const account = useRouteName(ROUTES.account);
  useEffect(() => {
    const loadData = async function () {
      await dispatch(loadUser());
      setIsLoaded(true);
    };
    if (!isLoaded) {
      loadData().then();
    }
  }, [isLoaded]);
  const user = useAppSelector((state) => state.user);
  const [state, setState] = useState(user);

  console.log('Dump Account Edit user');
  console.log(user);
  const onUpdate = (user: Partial<UserDto>) => {
    setState({ ...state, ...user });
  };

  const getDocument = async function () {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5, maxWidth: 400, maxHeight: 400 }, function (res) {
      if (!res.assets) {
        return;
      }
      const image = res.assets[0];
      const thumbnailKey = thumbnailRoot + image.fileName;
      startLoad();
      fetchAndPutToS3({ key: thumbnailKey, fileUri: image.uri, options: { contentType: image.type } }).then((res: { key: string }) => {
        const image = awsUrl + res.key;

        setState({ ...state, imageSrc: image });
        endLoad();
      });
    });
  };
  const cancel = () => {
    setState(user);
    account();
  };

  const save = async function () {
    const updateUserDto = state;

    await dispatch(updateAccount({ updateUserDto }));

    await dispatch(loadUser());
    account();
  };
  return (
    <PageContainer>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <Avatar.Image source={{ uri: state.imageSrc }} size={128} />
        <Button mode={'outlined'} onPress={() => getDocument()} style={{ marginTop: 15 }}>
          Upload a Profile Picture
        </Button>
      </View>
      <ScrollView alwaysBounceVertical={false} contentContainerStyle={styles.container}>
        <TextField onChangeText={(text) => onUpdate({ firstName: text })} label={'First Name'} value={state.firstName} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ lastName: text })} label={'Last Name'} value={state.lastName} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ email: text })} label={'Email'} value={state.email} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ phoneNumber: text })} label={'Phone Number'} value={state.phoneNumber} disabled={!isLoaded} />
      </ScrollView>
      <ActionButtons cancelCb={cancel} actionCb={save} actionLabel={'Save'} />
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

export default withLoadingSpinner(AccountEdit);
