import React from 'react';
import { useDispatch } from 'react-redux';
import { Portal, Text, Button, Dialog } from 'react-native-paper';
import { StyleSheet, TextInput, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { theme } from 'mediashare/styles';
import { View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { sendEmail } from 'mediashare/store/modules/userConnection';

interface AccountCardProps {
  userId: string;
  showDialog: boolean;
  onDismiss: () => void;
}

interface IFromInput {
  email: string;
}

export default function ModalSheet({ showDialog, onDismiss, userId }: AccountCardProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
  
      if (!data.email) {
        return;
      }
      await dispatch(sendEmail({ userId, email: data.email }));
      reset();
      onDismiss();
   
  };

  return (
    <SafeAreaView>
      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => {
            reset();
            onDismiss();
          }}
          style={{ borderRadius: 10 }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <Dialog.Content>
              <Text style={styles.title}>Invite</Text>
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: 'required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      placeholderTextColor={theme.colors.text}
                      placeholder="Enter email"
                      value={value}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                  name="email"
                />
                <View
                  style={{
                    height: 30,
                  }}
                >
                  {errors.email?.message ? <Text style={{ color: theme.colors.error }}>{errors.email.message}</Text> : null}
                </View>
              </View>

              <Button mode="contained" dark color={theme.colors.white} buttonColor={theme.colors.primary} onPress={handleSubmit(onSubmit)}>
                {'confirm'}
              </Button>
            </Dialog.Content>
          </KeyboardAvoidingView>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: theme.colors.text,
    color: theme.colors.text,
  },
});
