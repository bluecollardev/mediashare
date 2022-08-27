import React  from 'react';
import { ScrollView, View } from 'react-native';
import { PageContainer, PageProps, KeyboardAvoidingPageContent } from 'mediashare/components/layout/PageContainer';
import { TextInput, HelperText, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { userSnack } from 'mediashare/hooks/useSnack';

interface FormData {
  username: string;
  password: string;
  email: string;
  phone: string;
}

const SignUpComponent = ({}: PageProps) => {
  const nav = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      phone: '',
    },
  });

    const {element,
    onToggleSnackBar,
    setMessage } = userSnack();
    

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { username, password, email, phone } = data;
       await Auth.signUp({
      username,
      password,
      attributes: {
      email,
      preferred_username:username,
      phone_number: phone,
    }});
    // @ts-ignore
    nav.navigate('confirm', {username});
      console.log(data);
    } catch (error) {
      setMessage('sign up error');
      onToggleSnackBar();
      console.log('sign up error',error);
    }
  };

  const onHandleBack = () => {
    reset();
    // @ts-ignore
    nav.navigate('login');
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
          <Text variant="displayLarge" style={{fontSize: 20, paddingBottom: 10 }}>Create your account</Text>
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
              name="password"
              rules={{
                required: 'required',
                minLength: {
                  value: 8,
                  message: 'Please enter a strong password',
                },
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

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput autoCapitalize="none" label="email" value={value} onBlur={onBlur} onChangeText={(value) => onChange(value)} />
                  <HelperText type="error">{errors.email?.message}</HelperText>
                </>
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'required',
                minLength: {
                  value: 10,
                  message: 'not correct phone number',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Please enter a number',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput autoCapitalize="none" label="phone" value={value} onBlur={onBlur} onChangeText={(value) => onChange(value)} />
                  <HelperText type="error">{errors.phone?.message}</HelperText>
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
              Sign Up
            </Button>

            <Button style={{paddingTop: 10}} labelStyle={{ fontSize: 10 }} mode="text" onPress={onHandleBack}>
              Back to sign in
            </Button>
          </View>
          {element}
        </ScrollView>
      </KeyboardAvoidingPageContent>
    </PageContainer>
  );
};

export default SignUpComponent;
