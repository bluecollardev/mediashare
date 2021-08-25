import * as React from 'react';
import { Button, Icon, Text, View } from 'native-base';

import { routeConfig } from '../../routes';

const PlaylistDetail = (props: { navigation }) => {
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
