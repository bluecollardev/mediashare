import React from 'react';

import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Subheading } from 'react-native-paper';
import { PageContainer } from '../layout/PageContainer';
import { AccountForm } from '../layout/AccountForm';

import styles from '../../styles';

export interface AccountContainerProps {
  navigation: any;
}

export const Account = ({ navigation }: AccountContainerProps) => {
  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, padding: 15 }}>
            <Subheading>Personal Information</Subheading>
            <AccountForm navigation={navigation} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default Account;
