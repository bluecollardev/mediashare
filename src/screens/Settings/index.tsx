import * as React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
} from 'native-base';

import styles from './styles';
export interface Props {
  navigation: any;
}
export interface State {}
class Settings extends React.Component<Props, State> {
  // <Icon name="ios-arrow-back" />
  render() {
    const param = this.props.navigation.state.params;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Text>Menu</Text>
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{param ? param.name.item : 'Settings'}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <Text>Back</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
        </Content>
      </Container>
    );
  }
}

export default Settings;
