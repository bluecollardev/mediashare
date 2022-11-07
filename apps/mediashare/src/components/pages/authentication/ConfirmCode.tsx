import React from 'react';
import { ScrollView, View } from 'react-native';
import { PageContainer, PageProps, KeyboardAvoidingPageContent } from 'mediashare/components/layout/PageContainer';
import { TextInput, HelperText, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { userSnack } from 'mediashare/hooks/useSnack';
import { routeConfig } from 'mediashare/routes';

interface FormData {
  username: string;
  code: string;
}

const ConfirmComponent = ({}: PageProps) => {
  const nav = useNavigation();
  const route = useRoute();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      username: route?.params?.username || '',
      code: '',
    },
  });

  const { element, onToggleSnackBar, setMessage } = userSnack();

  const username = watch('username');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { username, code } = data;
      await Auth.confirmSignUp(username, code);
      nav.navigate(routeConfig.login.name as never, {} as never);
    } catch (error) {
      setMessage(error.message);
      onToggleSnackBar();
      console.log('confirm error ', error);
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUp(username);
      setMessage('Code was send to your email');
      onToggleSnackBar();
    } catch (error) {
      setMessage(error.message);
      onToggleSnackBar();
      console.log('error resend code ', error);
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
              Verification your account
            </Text>
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'required',
                minLength: {
                  value: 4,
                  message: 'Too short!',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput autoCapitalize="none" label="username" value={value} onBlur={onBlur} onChangeText={(value) => onChange(value)} />
                  <HelperText type="error">{errors.username?.message}</HelperText>
                </>
              )}
            />
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

            <Button
              style={{
                borderRadius: 10,
                padding: 5,
              }}
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
              Confirm code
            </Button>

            <Button
              style={{
                borderRadius: 10,
                padding: 5,
                marginTop: 15,
              }}
              mode="outlined"
              onPress={handleResendCode}
            >
              Resend code
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

export default ConfirmComponent;
