import React from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { logoutAction } from '../../state/modules/user';

import { useRouteName } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, Subheading } from 'react-native-paper';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import { AccountForm } from '../layout/AccountForm';
import { ActionButtons } from '../layout/ActionButtons';
import { View } from 'react-native';

export const Account = ({ navigation }: PageProps) => {
  const onManageContactsClicked = useRouteName(ROUTES.contacts);
  const dispatch = useDispatch();
  // const loginRoute = usePageRoute(ROUTES.login);

  const onSignoutClicked = () => {
    dispatch(logoutAction());
    // loginRoute();
  };

  const actionLabel = 'Save';
  const cancelLabel = 'Cancel';

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <Subheading>Personal Information</Subheading>
        <AccountForm navigation={navigation} />
        <View>
          <Button onPress={onManageContactsClicked} dark mode={'outlined'}>
            Manage Contacts
          </Button>
          <Button onPress={onSignoutClicked} dark mode={'outlined'} style={{ marginTop: 15 }}>
            Sign Out
          </Button>
        </View>
      </KeyboardAvoidingPageContent>
      <PageActions>
        <ActionButtons rightIcon="check-circle" actionLabel={actionLabel} cancelLabel={cancelLabel} actionCb={() => {}} cancelCb={() => {}} />
      </PageActions>
    </PageContainer>
  );
};

export default withLoadingSpinner(Account);
