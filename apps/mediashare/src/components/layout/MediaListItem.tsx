import * as React from 'react';
import { Text, Button, Icon, Left, Body, Right, ListItem, Thumbnail } from 'native-base';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import CheckBox from '@react-native-community/checkbox';

export interface MediaListItemProps {
  navigation?: any;
  title?: string;
  description?: string;
  image?: string;
  selectable?: boolean;
  showActions?: boolean;
  checked?: boolean;
  onViewDetail?: () => void;
  onChecked?: (cb: boolean) => void;
}

export const MediaListItem: React.FC<MediaListItemProps> = (props) => {
  const DEFAULT_IMAGE = require('./video-placeholder.jpg');

  const { title, description, image, selectable = true, showActions = true, onViewDetail = () => {}, onChecked = (cb: boolean) => {}, checked = false } = props;
  const [source, setSource] = useState(null);
  useEffect(() => {
    if (image) {
      Storage.get(image, { download: false }).then((res: string) => {
        setSource({ uri: res });
      });
    }
  }, [image]);
  return (
    <ListItem style={{ borderWidth: 0 }}>
      {selectable && (
        <Left style={{ width: '10%', flex: 1 }}>
          <CheckBox value={checked} onValueChange={(newValue) => onChecked(newValue)} />
        </Left>
      )}
      <Left style={{ width: '20%', flex: 1 }}>{!source ? <Thumbnail source={DEFAULT_IMAGE} square /> : <Thumbnail source={source} square />}</Left>
      <Body
        style={{
          flex: 4,
          width: '60%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderWidth: 0,
        }}
      >
        <Text style={{ borderWidth: 0 }}>{title}</Text>
        <Text note numberOfLines={2} style={{ color: 'black' }}>
          {description}
        </Text>
      </Body>
      {showActions === true && (
        <Right style={{ width: '10%', flex: 1 }}>
          <Button transparent onPress={onViewDetail}>
            <Icon name="chevron-forward-outline" />
          </Button>
        </Right>
      )}
    </ListItem>
  );
};
