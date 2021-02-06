import * as React from 'react';
import { Button, Container, Content, Icon, Text, View } from 'native-base';

import { ContactList } from '../../components/layout/ContactList';

import styles from './styles';

export interface ShareWithProps {
  navigation: any;
  list: any;
}

export interface ShareWithState {}

class ShareWith extends React.Component<ShareWithProps, ShareWithState> {
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { navigation } = this.props;

    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <ContactList
              showGroups={true}
            />
          </View>
          <View padder style={{ flexDirection: 'row' }}>
            <Button
              iconLeft
              bordered
              danger
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center',
              }}>
              <Icon name="close-outline" />
              <Text style={{ paddingRight: 30 }}>Cancel</Text>
            </Button>
            <Button
              iconLeft
              bordered
              success
              style={{
                flex: 1,
                marginRight: 10,
                justifyContent: 'center'
              }}>
              <Icon name="checkmark" />
              <Text style={{ paddingRight: 30 }}>Share</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ShareWith;
