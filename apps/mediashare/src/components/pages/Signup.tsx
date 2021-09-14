import React from 'react';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Subheading } from 'react-native-paper';
import { PageContainer, PageProps } from '../layout/PageContainer';
import { SignupForm } from '../layout/SignupForm';

import styles from '../../styles';

export const Signup = ({ navigation }: PageProps) => {
  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, padding: 15 }}>
            <Subheading>Personal Information</Subheading>
            <SignupForm navigation={navigation} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default withLoadingSpinner(Signup);
