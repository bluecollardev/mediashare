import * as React from 'react';
import { Button, Container, Content, Icon, List, Text, View } from 'native-base';

import MediaDetail, { MediaDetailProps, MediaDetailState } from '../MediaDetail';

import { routeConfig } from '../../routes';

export interface PlaylistDetailProps extends MediaDetailProps {
  navigation: any;
  list: any;
}

export interface PlaylistDetailState extends MediaDetailState {}

const PlaylistDetail = (props) => {
  const { navigation } = props;

  return (
    <Button
      iconLeft
      bordered
      dark
      style={{ flex: 1, marginRight: 10, justifyContent: 'center' }}
      onPress={() => {
        navigation.navigate(routeConfig.addFromLibrary.name);
      }}
    >
      <Icon name="add-outline" />
      <Text style={{ paddingRight: 30 }}>Add Video From Library</Text>
    </Button>
  );
};

export default PlaylistDetail;
