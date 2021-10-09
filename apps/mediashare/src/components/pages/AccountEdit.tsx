import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { Avatar, Banner, Button, Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { UserDto } from '../../rxjs-api';
import { useAppSelector } from '../../state';
import { loadUser, updateAccount } from '../../state/modules/user';
import TextField from '../form/TextField';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import PageContainer, { PageProps } from '../layout/PageContainer';
import { launchImageLibrary } from 'react-native-image-picker';
import { fetchAndPutToS3 } from '../../state/modules/media-items/storage';
import Config from 'react-native-config';
import { thumbnailRoot } from '../../state/modules/media-items/key-factory';
import { useRouteWithParams, useViewProfileById } from '../../hooks/NavigationHooks';
import { ROUTES } from '../../routes';
import { ActionButtons } from '../layout/ActionButtons';
import { loadProfile } from '../../state/modules/profile';
import { from, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import * as R from 'remeda';
import { theme } from '../../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const awsUrl = Config.AWS_URL;
console.log(awsUrl);

interface AccountEditProps extends PageProps {}

function AccountEdit({ startLoad, endLoad, route, navigation }: AccountEditProps) {
  const { userId = null } = route.params;
  console.log('🚀 -------------------------------------------------------------------');
  console.log('🚀 ~ file: AccountEdit.tsx ~ line 34 ~ AccountEdit ~ userId', userId);
  console.log('🚀 -------------------------------------------------------------------');
  console.log('🚀 ~ file: AccountEdit.tsx ~ line 34 ~ AccountEdit ~ userId', userId);

  const dispatch = useDispatch();

  const viewAccount = useRouteWithParams(ROUTES.account);
  // const viewProfile = useViewProfileById();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = (await dispatch(loadProfile({ userId }))) as any;
      setState(result.payload);
      setIsLoaded(true);
    }
    if (!isLoaded) {
      loadData();
    }
  });
  const user = useAppSelector((state) => state.profile.entity);
  const withoutName = function () {
    return state.firstName.length < 1 || state.lastName.length < 1;
  };
  const [state, setState] = useState(R.pick(user, ['firstName', 'email', 'lastName', 'phoneNumber', 'imageSrc']));

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
    viewAccount({ userId });
  };

  const save = function () {
    const updateUserDto = state;

    from(dispatch(updateAccount({ updateUserDto, userId })))
      .pipe(
        switchMap(() => dispatch(loadProfile({ userId }))),
        switchMap(() => dispatch(loadUser())),
        take(1)
      )
      .subscribe(() => viewAccount({ userId }));
  };
  return (
    <PageContainer>
      {withoutName() && (
        <Card>
          <Card.Title
            title={'A name is required'}
            left={(props) => <MaterialIcons {...props} name="warning" color={theme.colors.error} size={30} />}
            // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
          />
        </Card>
      )}
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
      <ActionButtons
        disableAction={withoutName()}
        disableCancel={withoutName()}
        cancelCb={cancel}
        actionCb={save}
        actionLabel={'Save'}
        rightIcon="check-circle"
      />
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
