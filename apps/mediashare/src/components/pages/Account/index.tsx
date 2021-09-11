import React from 'react';
import { Container, View } from 'native-base';

import { AccountForm } from '../../layout/AccountForm';

import styles from '../../../styles';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

// import { Accordion } from '../../layout/Accordion';

export interface AccountContainerProps {
  navigation: any;
  fetchList: Function;
  data: Object;
}

export interface AccountContainerState {}

export const AccountContainer = ({ navigation }: AccountContainerProps) => {
  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View padder>
            <AccountForm navigation={navigation} />
            {/* <Accordion /> */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AccountContainer;
