import React from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES } from '../../routes';

import { logoutAction } from '../../state/modules/user';

import { useRouteName } from '../../hooks/NavigationHooks';
import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { Button, Subheading } from 'react-native-paper';
import { PageContainer, KeyboardAvoidingPageContent, PageActions, PageProps } from '../layout/PageContainer';
import { AccountForm } from '../layout/AccountForm';

export const Account = ({ navigation }: PageProps) => {
  const onManageContactsClicked = useRouteName(ROUTES.contacts);
  const dispatch = useDispatch();
  // const loginRoute = usePageRoute(ROUTES.login);

  const onSignoutClicked = () => {
    dispatch(logoutAction());
    // loginRoute();
  };

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <Subheading>Personal Information</Subheading>
        <AccountForm navigation={navigation} />
      </KeyboardAvoidingPageContent>
      <PageActions style={{ height: 70 }}>
        <Button onPress={onManageContactsClicked} dark mode={'outlined'}>
          Manage Contacts
        </Button>
        <Button onPress={onSignoutClicked} dark mode={'contained'}>
          Sign Out
        </Button>
      </PageActions>
    </PageContainer>
  );
};

export default withLoadingSpinner(Account);
