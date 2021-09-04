import React from 'react';
import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Text, Button, Icon, Left, Body, Right, ListItem, Thumbnail, View } from 'native-base';
import { Storage } from 'aws-amplify';

import { usePreviewImage } from '../../hooks/UsePreviewImage';

export interface MediaListItemProps {
  navigation?: any;
  title?: string;
  description?: string;
  image?: string;
  selectable?: boolean;
  showActions?: boolean;
  showThumbnail?: boolean;
  checked?: boolean;
  onViewDetail?: () => void;
  onChecked?: (bool: boolean) => void;
}

export const MediaListItem: React.FC<MediaListItemProps> = ({
  checked,
  image,
  description,
  title,
  onViewDetail,
  onChecked = () => {},
  selectable = true,
  showActions = true,
  showThumbnail = false,
}: MediaListItemProps) => {
  const DEFAULT_IMAGE = usePreviewImage();
  const [isChecked, setIsChecked] = useState(checked);
  const [source, setSource] = useState(null);
  useEffect(() => {
    if (image) {
      Storage.get(image, { download: false }).then((res: string) => {
        setSource({ uri: res });
      });
    }
  }, [image]);
  useEffect(() => {}, [source]);
  return (
    <ListItem style={{ borderWidth: 0 }}>
      {true && (
        <Left style={{ width: '10%', flex: 1 }}>
          <CheckBox value={isChecked} onValueChange={(v) => onChecked(v)} />
        </Left>
      )}
      <Body
        style={{
          flex: 4,
          width: '60%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderWidth: 0,
        }}
      >
        <TouchableWithoutFeedback onPress={onViewDetail}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {!source ? (
              <View style={{ marginRight: 10 }}>
                <Thumbnail source={DEFAULT_IMAGE} square />
              </View>
            ) : (
              <View style={{ marginRight: 10 }}>
                <Thumbnail source={source} square />
              </View>
            )}
            <View>
              <Text style={{ borderWidth: 0, marginBottom: 3, fontSize: 15 }}>{typeof title === 'string' ? title.replace('.', ' ') : ''}</Text>
              <Text note numberOfLines={2} style={{ color: '#333', fontSize: 11 }}>
                {description}
              </Text>
              <Text note numberOfLines={2} style={{ color: '#333', fontSize: 11 }}>
                Length: 12s
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
