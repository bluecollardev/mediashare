import React from 'react';

import { Avatar } from 'react-native-paper';
import LabelledElement from './LabelledElement';

interface LabelledAvatarProps {
  uri: string;
  label: string;
}

function LabelledAvatar({ uri, label }: LabelledAvatarProps) {
  return (
    <LabelledElement label={label}>
      <Avatar.Image source={{ uri }} size={40} />
    </LabelledElement>
  );
}

export default LabelledAvatar;
