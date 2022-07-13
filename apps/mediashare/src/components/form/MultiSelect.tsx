import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from 'mediashare/styles';

export function MultiSelectIcon({ name, size = 18, styles }) {
  let iconComponent;
  switch (name) {
    case 'search':
      iconComponent = <IconButton icon="search" iconColor={theme.colors.primary} />;
      break;
    case 'keyboard-arrow-up':
      iconComponent = <IconButton icon="keyboard-arrow-up" iconColor={theme.colors.primary} />;
      break;
    case 'keyboard-arrow-down':
      iconComponent = <IconButton icon="keyboard-arrow-down" iconColor={theme.colors.primary} />;
      break;
    case 'close':
      iconComponent = <IconButton icon="cancel" iconColor={theme.colors.primary} />;
      break;
    case 'check':
      iconComponent = <IconButton icon="check-circle" iconColor={theme.colors.primary} />;
      break;
    case 'cancel':
      iconComponent = <IconButton icon="cancel" iconColor={theme.colors.default} />;
      break;
    default:
      iconComponent = null;
      break;
  }
  return <View style={styles}>{iconComponent}</View>;
}
