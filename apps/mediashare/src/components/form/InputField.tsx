import { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';

interface InputFieldProps {
  children: ReactNode;
}

function InputField({ children }: InputFieldProps) {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>InputField</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});

export default InputField;
