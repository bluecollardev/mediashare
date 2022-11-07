import React from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginAction } from 'mediashare/store/modules/user';
import { withLoadingSpinner } from 'mediashare/components/hoc/withLoadingSpinner';
import { Text, Card, TextInput, HelperText, Button } from 'react-native-paper';
import { PageContainer, PageProps, KeyboardAvoidingPageContent } from 'mediashare/components/layout/PageContainer';
import { theme } from 'mediashare/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { userSnack } from 'mediashare/hooks/useSnack';
import { routeConfig } from 'mediashare/routes';

interface FormData {
  username: string;
  password: string;
}

const LoginComponent = ({}: PageProps) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { element, onToggleSnackBar, setMessage } = userSnack();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await Auth.signIn(data.username, data.password);
      const accessToken = response.signInUserSession.accessToken.jwtToken;
      const idToken = response.signInUserSession.idToken.jwtToken;
      dispatch(loginAction({ accessToken, idToken }));
    } catch (error) {
      setMessage(error.message);
      onToggleSnackBar();
      if (error.code === 'UserNotConfirmedException') {
        // @ts-ignore
        nav.navigate(routeConfig.confirm.name, { username: data.username });
        reset();
      }
      console.log(error.code);
      console.log('login', error);
    }
  };

  const onHandleForgotPassword = () => {
    nav.navigate(routeConfig.resetPassword.name as never, {} as never);
  };

  const onHandleSignUp = () => {
    nav.navigate(routeConfig.signUp.name as never, {} as never);
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
            <Card elevation={0}>
              <Card.Cover
                resizeMode="contain"
                source={require('mediashare/assets/logo/mediashare/256.png')}
                style={{ backgroundColor: theme.colors.background }}
              />
            </Card>
            <View style={{ paddingVertical: 10 }}>
              <Text variant="displayLarge" style={{ fontSize: 20 }}>
                Sign in to account
              </Text>
            </View>
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'required',
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <View>
                    <TextInput autoCapitalize="none" label="username" value={value} onBlur={onBlur} onChangeText={(value) => onChange(value)} />
                    <HelperText type="error">{errors.username?.message}</HelperText>
                  </View>
                );
              }}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    autoCapitalize="none"
                    label="password"
                    secureTextEntry
                    textContentType="password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                  />
                  <HelperText type="error">{errors.password?.message}</HelperText>
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
              Sign In
            </Button>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}
            >
              <Button labelStyle={{ fontSize: 10 }} mode="text" onPress={onHandleForgotPassword}>
                Forgot password?
              </Button>
              <Button labelStyle={{ fontSize: 10 }} mode="text" onPress={onHandleSignUp}>
                Don't have an account?
              </Button>
            </View>
            {element}
          </View>
        </ScrollView>
      </KeyboardAvoidingPageContent>
    </PageContainer>
  );
};

export default withLoadingSpinner(undefined)(LoginComponent);
