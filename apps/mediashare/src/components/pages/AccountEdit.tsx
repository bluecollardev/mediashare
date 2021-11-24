import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import Config from '../../config';
import * as R from 'remeda';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { launchImageLibrary } from 'react-native-image-picker';

import { UserDto } from '../../rxjs-api';

import { useAppSelector } from '../../store';
import { loadUser, updateAccount } from '../../store/modules/user';
import { fetchAndPutToS3 } from '../../store/modules/media-items/storage';
import { thumbnailRoot } from '../../store/modules/media-items/key-factory';
import { loadProfile } from '../../store/modules/profile';

import { ROUTES } from '../../routes';

import { useRouteWithParams } from '../../hooks/NavigationHooks';
import { TextField } from '../form/TextField';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';
import { PageContainer, PageProps } from '../layout/PageContainer';
import { ActionButtons } from '../layout/ActionButtons';
import { AccountCard } from '../layout/AccountCard';

const awsUrl = Config.AWS_URL;
interface AccountEditProps extends PageProps {}

const AccountEdit = ({ route }: AccountEditProps) => {
  const { userId = null } = route.params;

  const dispatch = useDispatch();

  const viewAccount = useRouteWithParams(ROUTES.account);
  // const viewProfile = useViewProfileById();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = (await dispatch(loadProfile(userId))) as any;
      setState(result.payload);
      setIsLoaded(true);
    }
    if (!isLoaded) {
      loadData();
    }
  });

  const user = useAppSelector((state) => state.profile.entity);
  const withoutName = () => state?.firstName?.length < 1 || state?.lastName?.length < 1;
  const [state, setState] = useState(R.pick(user, ['firstName', 'email', 'lastName', 'phoneNumber', 'imageSrc']));

  // eslint-disable-next-line no-shadow
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
      fetchAndPutToS3({ key: thumbnailKey, fileUri: image.uri, options: { contentType: image.type } }).then((res: { key: string }) => {
        // eslint-disable-next-line no-shadow
        const image = awsUrl + res.key;
        setState({ ...state, imageSrc: image });
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
        switchMap(() => dispatch(loadProfile(userId))),
        switchMap(() => dispatch(loadUser())),
        take(1)
      )
      .subscribe(() => viewAccount({ userId }));
  };

  const fullName = state?.firstName || state?.lastName ? `${state?.firstName} ${state?.lastName}` : 'Unnamed User';

  return (
    <PageContainer>
      <View>
        <AccountCard
          title={fullName}
          email={state?.email}
          phoneNumber={state?.phoneNumber}
          image={user?.imageSrc}
          likes={state?.likesCount}
          shared={state?.sharedCount}
          shares={state?.sharesCount}
          onProfileImageClicked={() => getDocument()}
          showSocial={true}
          showActions={true}
          isCurrentUser={true}
        />
      </View>
      <ScrollView alwaysBounceVertical={false} contentContainerStyle={styles.container}>
        <TextField onChangeText={(text) => onUpdate({ firstName: text })} label={'First Name'} value={state?.firstName} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ lastName: text })} label={'Last Name'} value={state?.lastName} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ email: text })} label={'Email'} value={state?.email} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ phoneNumber: text })} label={'Phone Number'} value={state?.phoneNumber} disabled={!isLoaded} />
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
};

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
