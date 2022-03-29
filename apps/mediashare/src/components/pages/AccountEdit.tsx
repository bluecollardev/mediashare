import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import Config from 'mediashare/config';
import * as R from 'remeda';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { launchImageLibrary } from 'react-native-image-picker';

import { UserDto } from 'mediashare/rxjs-api';

import { useAppSelector } from 'mediashare/store';
import { loadUser, updateAccount } from 'mediashare/store/modules/user';
import { fetchAndPutToS3 } from 'mediashare/store/modules/media-items/storage';
import { thumbnailRoot } from 'mediashare/store/modules/media-items/key-factory';
import { loadProfile } from 'mediashare/store/modules/profile';

import { routeNames } from 'mediashare/routes';

import { useRouteWithParams } from 'mediashare/hooks/NavigationHooks';
import { TextField } from 'mediashare/components/form/TextField';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { PageContainer, PageProps } from 'mediashare/components/layout/PageContainer';
import { ActionButtons } from 'mediashare/components/layout/ActionButtons';
import { AccountCard } from 'mediashare/components/layout/AccountCard';

const awsUrl = Config.AWS_URL;
interface AccountEditProps extends PageProps {}

const AccountEdit = ({ route }: AccountEditProps) => {
  const { userId = null } = route.params;

  const dispatch = useDispatch();

  const viewAccount = useRouteWithParams(routeNames.account);
  // const viewProfile = useViewProfileById();

  const [isLoaded, setIsLoaded] = useState(false);

  const user = useAppSelector((state) => state.profile.entity);
  const [state, setState] = useState(R.pick(user, ['firstName', 'email', 'lastName', 'phoneNumber', 'imageSrc']));
  const withoutName = () => state?.firstName?.length < 1 || state?.lastName?.length < 1;
  const fullName = state?.firstName || state?.lastName ? `${state?.firstName} ${state?.lastName}` : 'Unnamed User';

  useEffect(() => {
    async function loadData() {
      const profile = (await dispatch(loadProfile(userId))) as any;
      setState(profile.payload);
      setIsLoaded(true);
    }
    if (!isLoaded) {
      loadData().then();
    }
  }, []);

  return (
    <PageContainer>
      <View>
        <AccountCard
          title={fullName}
          email={state?.email}
          phoneNumber={state?.phoneNumber}
          image={state?.imageSrc}
          likes={state?.likesCount}
          shared={state?.sharedCount}
          shares={state?.sharesCount}
          showSocial={true}
          showActions={true}
          isCurrentUser={true}
          onProfileImageClicked={() => getDocument()}
        />
      </View>
      <ScrollView alwaysBounceVertical={false} contentContainerStyle={styles.container}>
        <TextField onChangeText={(text) => onUpdate({ firstName: text })} label={'First Name'} value={state?.firstName} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ lastName: text })} label={'Last Name'} value={state?.lastName} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ email: text })} label={'Email'} value={state?.email} disabled={!isLoaded} />
        <TextField onChangeText={(text) => onUpdate({ phoneNumber: text })} label={'Phone Number'} value={state?.phoneNumber} disabled={!isLoaded} />
      </ScrollView>
      <ActionButtons disableAction={withoutName()} disableCancel={withoutName()} onCancelClicked={cancel} onActionClicked={save} actionLabel="Save" />
    </PageContainer>
  );

  // eslint-disable-next-line no-shadow
  function onUpdate(user: Partial<UserDto>) {
    setState({ ...state, ...user });
  }

  async function getDocument() {
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
  }

  function cancel() {
    setState(user);
    viewAccount({ userId });
  }

  function save() {
    const updateUserDto = state;
    // @ts-ignore
    from(dispatch(updateAccount({ updateUserDto, userId })))
      .pipe(
        // @ts-ignore
        switchMap(() => dispatch(loadProfile(userId))),
        // @ts-ignore
        switchMap(() => dispatch(loadUser())),
        take(1)
      )
      .subscribe(() => viewAccount({ userId }));
  }
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

export default withLoadingSpinner(undefined)(AccountEdit);
