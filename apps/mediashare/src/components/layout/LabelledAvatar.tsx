import React, { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import LabelledElement from './LabelledElement';

interface LabelledAvatarProps {
  uri: string;
  label: string;
}

function LabelledAvatar({ uri, label }: LabelledAvatarProps) {
  return (
    <LabelledElement label={label}>
      <Avatar.Image source={{ uri }} />
    </LabelledElement>
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

export default LabelledAvatar;
