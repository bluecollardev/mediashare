import React from 'react';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { PageContainer, PageProps, KeyboardAvoidingPageContent } from '../layout/PageContainer';
import { ResetPasswordForm } from '../layout/ResetPasswordForm';

export const ResetPassword = ({ navigation }: PageProps) => {
  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <Card elevation={0}>
          <Card.Cover style={{ backgroundColor: '#fff' }} resizeMode={'contain'} source={require('./logo.png')} />
          <Card.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <View>
              <ResetPasswordForm navigation={navigation} />
            </View>
          </Card.Content>
        </Card>
      </KeyboardAvoidingPageContent>
    </PageContainer>
  );
};

export default withLoadingSpinner(ResetPassword);
