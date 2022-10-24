import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { PageContainer, PageProps, KeyboardAvoidingPageContent } from 'mediashare/components/layout/PageContainer';
import { TextInput, HelperText, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { userSnack } from 'mediashare/hooks/useSnack';
import { routeConfig } from 'mediashare/routes';

interface FormData {
  username: string;
  code: string;
  newPassword: string;
}

const ResetPasswordComponent = ({}: PageProps) => {
  const nav = useNavigation();
  const [showCode, setShowCode] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      code: '',
      newPassword: '',
    },
  });

  const { element, onToggleSnackBar, setMessage } = userSnack();

  const sendCodePassword = async (data) => {
    try {
      const { username } = data;
      await Auth.forgotPassword(username);
      setMessage('Please check your email');
      onToggleSnackBar();
      setShowCode(true);
    } catch (error) {
      throw error;
    }
  };

  const newPassword = async (data) => {
    try {
      const { username, code, newPassword } = data;
      await Auth.forgotPasswordSubmit(username, code, newPassword);
    } catch (error) {
      throw error;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (showCode) {
        newPassword(data);
        nav.navigate(routeConfig.login.name as never, {} as never);
      } else {
        sendCodePassword(data);
      }
    } catch (error) {
      setMessage(error.message);
      onToggleSnackBar();
      console.log('code error--->', error);
    }
  };

  const onHandleBack = () => {
    reset();
    nav.navigate(routeConfig.login.name as never, {} as never);
  };

  return (
    <PageContainer>
      <KeyboardAvoidingPageContent>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text variant="displayLarge" style={{ fontSize: 20, paddingBottom: 10 }}>
              Reset your password{' '}
            </Text>
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput autoCapitalize="none" label="username" value={value} onBlur={onBlur} onChangeText={(value) => onChange(value)} />
                  <HelperText type="error">{errors.username?.message}</HelperText>
                </>
              )}
            />

            {showCode && (
              <>
                <Controller
                  control={control}
                  name="code"
                  rules={{
                    required: 'required',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput autoCapitalize="none" label="code" value={value} onBlur={onBlur} onChangeText={(value) => onChange(value)} />
                      <HelperText type="error">{errors.code?.message}</HelperText>
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name="newPassword"
                  rules={{
                    required: 'required',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput autoCapitalize="none" label="newPassword" value={value} onBlur={onBlur} onChangeText={(value) => onChange(value)} />
                      <HelperText type="error">{errors.newPassword?.message}</HelperText>
                    </>
                  )}
                />
              </>
            )}
            <Button
              style={{
                borderRadius: 10,
                padding: 5,
              }}
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
              {showCode ? 'Confirm' : 'Send code'}
            </Button>

            <Button style={{ paddingTop: 10 }} labelStyle={{ fontSize: 10 }} mode="text" onPress={onHandleBack}>
              Back to sign in
            </Button>
          </View>
          {element}
        </ScrollView>
      </KeyboardAvoidingPageContent>
    </PageContainer>
  );
};

export default ResetPasswordComponent;
