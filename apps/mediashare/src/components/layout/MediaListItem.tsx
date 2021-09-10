import React from 'react';
import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, Left, Body, Right, ListItem, Thumbnail, View } from 'native-base';
import { Storage } from 'aws-amplify';

import { usePreviewImage } from '../../hooks/UsePreviewImage';
import { Avatar, Caption, Checkbox, IconButton, List, Text } from 'react-native-paper';
import { theme } from '../../styles';

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
const AvatarComponent = (uri: any) => {
  return <Avatar.Image size={24} source={{ uri: uri.uri }} />;
};
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
  const [isChecked, setIsChecked] = useState(checked);
  const DEFAULT_IMAGE = usePreviewImage();

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
    <List.Item
      title={title}
      description={() => {
        return (
          <Caption style={{ height: '100%' }} onPress={onViewDetail}>
            {description}
          </Caption>
        );
      }}
      left={() =>
        selectable ? (
          <>
            <Checkbox.IOS
              status={!isChecked ? 'indeterminate' : 'checked'}
              onPress={() => {
                setIsChecked(!isChecked);
                onChecked(isChecked);
              }}
              color={isChecked ? theme.colors.success : theme.colors.disabled}
            />
            {showThumbnail ? source ? <Avatar.Image size={36} source={source} /> : <Avatar.Image size={36} source={{ uri: DEFAULT_IMAGE }} /> : <></>}
          </>
        ) : (
          showThumbnail && source && <Avatar.Image size={36} source={source} />
        )
      }
      right={() => showActions === true && <IconButton icon="chevron-right" color={theme.colors.accent} onPress={onViewDetail} />}
    />
    // <ListItem style={{ borderWidth: 0 }} selected={false}>
    //   {selectable && (
    //     <Left style={{ width: '10%', flex: 1 }}>
    //       <Checkbox.IOS
    //         status={!isChecked ? 'indeterminate' : 'checked'}
    //         onPress={() => {
    //           setIsChecked(!isChecked);
    //           onChecked(isChecked);
    //         }}
    //         color={isChecked ? theme.colors.success : theme.colors.disabled}
    //       />
    //     </Left>
    //   )}
    //   <Body
    //     style={{
    //       flex: 4,
    //       justifyContent: 'flex-start',
    //       alignItems: 'flex-start',
    //       borderWidth: 0,
    //     }}
    //   >
    //     <TouchableWithoutFeedback onPress={onViewDetail}>
    //       <View style={{ display: 'flex', flexDirection: 'row' }}>
    //         {!source && showThumbnail ? (
    //           <View style={{ marginRight: 10 }}>
    //             <Avatar.Image source={{ uri: DEFAULT_IMAGE }} />
    //           </View>
    //         ) : showThumbnail ? (
    //           <View style={{ marginRight: 10 }}>
    //             <Avatar.Image size={48} source={source} />
    //           </View>
    //         ) : null}
    //         <View>
    //           <Text style={{ borderWidth: 0, marginBottom: 3, fontSize: 15 }}>{typeof title === 'string' ? title.replace('.', ' ') : ''}</Text>
    //           <Text note numberOfLines={2} style={{ color: '#333', fontSize: 11 }}>
    //             {description}
    //           </Text>
    //           <Text note numberOfLines={2} style={{ color: '#333', fontSize: 11 }}>
    //             Length: 12s
    //           </Text>
    //         </View>
    //       </View>
    //     </TouchableWithoutFeedback>
    //   </Body>
    //   {showActions === true && (
    //     <Right style={{ width: '10%', flex: 1 }}>
    //       <TouchableWithoutFeedback>
    //         <IconButton icon="chevron-right" color={theme.colors.accent} onPress={onViewDetail} />
    //       </TouchableWithoutFeedback>
    //     </Right>
    //   )}
    // </ListItem>
  );
};
