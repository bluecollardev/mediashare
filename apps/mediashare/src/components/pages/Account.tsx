import React from 'react';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ScrollView, View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import { PageContainer, PageProps } from '../layout/PageContainer';
import { AccountForm } from '../layout/AccountForm';

import styles from '../../styles';
import { useRouteName } from '../../hooks/NavigationHooks';
import { ROUTES } from '../../routes';

export const Account = ({ navigation }: PageProps) => {
  const onManageContactsClicked = useRouteName(ROUTES.contacts);
  const onSignoutClicked = useRouteName(ROUTES.login);

  return (
    <PageContainer>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, padding: 15 }}>
              <Subheading>Personal Information</Subheading>
              <AccountForm navigation={navigation} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
      <View>
        <Button onPress={onManageContactsClicked} dark mode={'outlined'} style={{ marginTop: 10 }}>
          Manage Contacts
        </Button>
        <Button onPress={onSignoutClicked} dark mode={'contained'} style={{ marginTop: 0 }}>
          Sign Out
        </Button>
      </View>
    </PageContainer>
  );
};

export default withLoadingSpinner(Account);
