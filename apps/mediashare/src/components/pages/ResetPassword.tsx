import React from 'react';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Card, Subheading } from 'react-native-paper';
import { PageContainer, PageProps } from '../layout/PageContainer';
import { ResetPasswordForm } from '../layout/ResetPasswordForm';

import styles from '../../styles';

export const ResetPassword = ({ navigation }: PageProps) => {
  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card elevation={0}>
            <Card.Cover style={{ backgroundColor: '#fff' }} resizeMode={'contain'} source={require('./logo.png')} />
            <Card.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <View>
                <ResetPasswordForm navigation={navigation} />
              </View>
            </Card.Content>
          </Card>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default withLoadingSpinner(ResetPassword);
