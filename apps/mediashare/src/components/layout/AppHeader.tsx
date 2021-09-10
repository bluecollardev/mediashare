import React from 'react';
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import { Appbar } from 'react-native-paper';
import { theme } from '../../styles';

export interface AppHeaderProps {
  title: string;
  navigation: any;
  showBack?: boolean;
  showSearch?: boolean;
  showSort?: boolean;
}

export const AppHeader = (props: AppHeaderProps) => {
  const {
    navigation,
    title = '',
    showBack = false,
    // showSearch = false,
    showSort = false,
  } = props;
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.accent }}>
      {showBack && <Appbar.BackAction onPress={navigation.goBack} />}

      <Appbar.Content title={title} />
      {showSort && <Appbar.Action icon={'filter'} onPress={() => {}} />}
    </Appbar.Header>
  );
};
