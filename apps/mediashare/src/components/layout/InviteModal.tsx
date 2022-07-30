import React from 'react';
import { Modal, Portal, Text ,Button} from 'react-native-paper';
import { StyleSheet, TextInput  } from 'react-native';
import { theme } from 'mediashare/styles';
import { View } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { transparent } from 'react-native-paper/src/styles/themes/v2/colors';

interface IFromInput {
  email: string;
}

export default function ModalSheet({ showDialog, onDismiss }) {
  const containerStyle = {
    backgroundColor: transparent,
    padding: 20,
    height: '23%',
    marginTop: 'auto',
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit:SubmitHandler<IFromInput> = (data) => {
    // Todo call API 
    // checkout if have username or email 
  };

  return (
    <Portal>
      <Modal visible={showDialog} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
        <View>
          <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', marginBottom: 10 }}>Invite</Text>
          <Controller
            control={control}
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            }}
            render={({ field: { onChange, value } }) => <TextInput style={styles.input} placeholderTextColor={theme.colors.text} placeholder="Enter email" value={value} onChangeText={(value) => onChange(value)} />}
            name="email"
          />
          {errors.email?.message ? <Text style={{color: theme.colors.error}}>{errors.email.message}</Text> : null}
          </View>
          <Button mode="contained" dark color={theme.colors.white} buttonColor={theme.colors.primary}   onPress={handleSubmit(onSubmit)}>
            {'confirm'}
          </Button>
          </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: theme.colors.text,
    color: theme.colors.text,
    
  },
});
