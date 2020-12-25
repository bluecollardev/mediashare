import * as React from 'react';
import {
  Button,
  Container,
  Content,
  Icon,
  List,
  Text,
  View,
} from 'native-base';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';
import { ListItemGroup } from '../../components/layout/ListItemGroup';

import MediaDetail, {
  MediaDetailProps,
  MediaDetailState
} from '../MediaDetail';
import { MediaListItem } from '../../components/layout/MediaListItem';

export interface ShareWithProps extends MediaDetailProps {
  navigation: any;
  list: any;
}
export interface ShareWithState extends MediaDetailState {}

class ShareWith extends MediaDetail<ShareWithProps, ShareWithState> {
  render() {
    const { navigation } = this.props;

    const imageSrc =
      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const items = [
      { title: 'John Doe', description: 'john.doe@example.com', image: imageSrc },
      { title: 'Jane Smith', description: 'jane.smith@example.com', image: imageSrc },
      { title: 'Jennifer Hawthorne', description: 'jenniferhaw@example.com', image: imageSrc }
    ];

    return (
      <Container style={styles.container}>
        <AppHeader title="Share With" navigation={navigation} showBack={true} />
        <Content>
          <View>
            <List>
              <ListItemGroup key={'group1'} text={'Sample Group'} />
              {items.map((item, idx) => {
                const { title, description, image } = item;
                return (
                  <MediaListItem
                    key={`item-${idx}`}
                    title={title}
                    description={description}
                    image={image}
                  />
                );
              })}
            </List>
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
