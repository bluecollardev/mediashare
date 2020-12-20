import * as React from 'react';
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';

export interface AppHeaderProps {
  title: string;
  navigation: any;
}

export const AppHeader = (props: AppHeaderProps) => {
  const { navigation = { openDrawer: () => {} }, title = '' } = props;
  return (
    <Header>
      <Left>
        <Button
          transparent
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name="search-outline" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
};
