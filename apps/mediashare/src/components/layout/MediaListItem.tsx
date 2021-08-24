import * as React from 'react';
import { Text, Button, Icon, Left, Body, Right, ListItem, CheckBox, Thumbnail } from 'native-base';
import { S3Image } from 'aws-amplify-react-native';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

export interface MediaListItemProps {
  navigation?: any;
  title?: string;
  description?: string;
  image?: string;
  selectable?: boolean;
  showActions?: boolean;
  onViewDetail?: () => void;
}

export const MediaListItem: React.FC<MediaListItemProps> = (props) => {
  const { title, description, image, selectable = true, showActions = true, onViewDetail = () => {} } = props;
  const [source, setSource] = useState('');
  console.log(image);
  useEffect(() => {
    Storage.get(image).then((res: string) => {
      console.log(res);
      setSource(res);
    });
  }, []);
  return (
    <ListItem style={{ borderWidth: 0 }}>
      {selectable && (
        <Left style={{ width: '10%', flex: 1 }}>
          <CheckBox color="black" checked={false} />
        </Left>
      )}
      <Left style={{ width: '20%', flex: 1 }}>
        <Thumbnail source={{ uri: source }} />
      </Left>
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
