import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '../../styles';

export function MultiSelectIcon({ name, size = 18, styles }) {
  let iconComponent;
  switch (name) {
    case 'search':
      iconComponent = <IconButton icon="search" color={theme.colors.primary} />;
      break;
    case 'keyboard-arrow-up':
      iconComponent = <IconButton icon="keyboard-arrow-up" color={theme.colors.primary} />;
      break;
    case 'keyboard-arrow-down':
      iconComponent = <IconButton icon="keyboard-arrow-down" color={theme.colors.primary} />;
      break;
    case 'close':
      iconComponent = <IconButton icon="cancel" color={theme.colors.primary} />;
      break;
    case 'check':
      iconComponent = <IconButton icon="check-circle" color={theme.colors.primary} />;
      break;
    case 'cancel':
      iconComponent = <IconButton icon="cancel" color={theme.colors.default} />;
      break;
    default:
      iconComponent = null;
      break;
  }
  return <View style={styles}>{iconComponent}</View>;
}
