import * as React from 'react';
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';

export interface AppHeaderProps {
  title: string;
  navigation: any;
  showBack?: boolean;
  showSearch?: boolean;
  showSort?: boolean;
}

export const AppHeader = (props: AppHeaderProps) => {
  const {
    navigation = { openDrawer: () => {} },
    title = '',
    showBack = false,
    showSearch = false,
    showSort = false
  } = props;
  return (
    <Header>
      <Left>
        {showBack && (
          <Button
            transparent
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Icon name="chevron-back-outline" />
          </Button>
        )}
        {showSearch && (
          <Button
            transparent
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Icon name="search-outline" />
          </Button>
        )}
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        {showSort && (
          <Button transparent>
            <Icon name="filter" />
          </Button>
        )}
      </Right>
    </Header>
  );
};
