import React from 'react';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, Subheading } from 'react-native-paper';
import { PageContainer, PageProps } from '../layout/PageContainer';
import { SignupForm } from '../layout/SignupForm';

import styles from '../../styles';
import { useRouteName } from '../../hooks/NavigationHooks';
import { ROUTES } from '../../routes';

export const Signup = ({ navigation }: PageProps) => {
  const onExistingUserClicked = useRouteName(ROUTES.login);

  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card elevation={0}>
            <Card.Cover style={{ backgroundColor: '#fff' }} resizeMode={'contain'} source={require('./logo.png')} />
            <Card.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <View>
                <SignupForm navigation={navigation} />
                <Button
                  style={{ marginTop: 10 }}
                  onPress={onExistingUserClicked}
                >
                  I Have an Account
                </Button>
              </View>
            </Card.Content>
          </Card>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default withLoadingSpinner(Signup);
