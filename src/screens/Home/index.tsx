import * as React from 'react';
import { Container, Content, View } from 'native-base';

import styles from './styles';

export interface HomeProps {
  navigation: any;
  list: any;
}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <View padder>{/* <MediaCard /> */}</View>
        </Content>
      </Container>
    );
  }
}

export default Home;
