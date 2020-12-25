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

export interface AddFromProps extends MediaDetailProps {
  navigation: any;
  list: any;
}
export interface AddFromState extends MediaDetailState {}

class AddFrom extends MediaDetail<AddFromProps, AddFromState> {
  render() {
    const { navigation } = this.props;

    const descriptionText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
      'eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const imageSrc =
      'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    const items1 = [
      { title: 'Video 1', description: descriptionText, image: imageSrc },
      { title: 'Video 2', description: descriptionText, image: imageSrc }
    ];
    const items2 = [
      { title: 'Video 3', description: descriptionText, image: imageSrc },
      { title: 'Video 4', description: descriptionText, image: imageSrc }
    ];

    return (
      <Container style={styles.container}>
        <AppHeader title="Add From" navigation={navigation} showBack={true} />
        <Content>
          <View>
            <List>
              <ListItemGroup key={'group1'} text={'Vimeo'} />
              {items1.map((item, idx) => {
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
              <ListItemGroup key={'group2'} text={'YouTube'} />
              {items2.map((item, idx) => {
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
              <Text style={{ paddingRight: 30 }}>Save</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default AddFrom;
