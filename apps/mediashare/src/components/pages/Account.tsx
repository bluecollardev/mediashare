import React from 'react';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import { PageContainer, PageProps } from '../layout/PageContainer';
import { AccountForm } from '../layout/AccountForm';

import styles from '../../styles';

export const Account = ({ navigation }: PageProps) => {
  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, padding: 15 }}>
            <Subheading>Personal Information</Subheading>
            <AccountForm navigation={navigation} />
            <Button
              dark
              mode={'contained'}
              style={{ marginTop: 10 }}
            >
              Sign Out
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default withLoadingSpinner(Account);
