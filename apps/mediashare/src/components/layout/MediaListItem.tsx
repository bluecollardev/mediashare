import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

import { usePreviewImage } from '../../hooks/UsePreviewImage';
import { View } from 'react-native';
import { Avatar, Caption, Checkbox, IconButton, List } from 'react-native-paper';
import styles, { theme } from '../../styles';

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
  // TODO: Why is this here, it's not used?
  useEffect(() => {}, [source]);
  return (
    <List.Item
      title={title}
      description={() => {
        return <Caption onPress={onViewDetail}>{description}</Caption>;
      }}
      left={() =>
        selectable ? (
          <View style={styles.mediaListItem}>
            <Checkbox
              status={!isChecked ? 'indeterminate' : 'checked'}
              onPress={() => {
                console.log('checked status', isChecked);
                setIsChecked(!isChecked);
                onChecked(!isChecked);
              }}
              color={isChecked ? theme.colors.success : theme.colors.disabled}
            />
            {showThumbnail ? (
              source ? (
                <Avatar.Image style={styles.mediaListItemThumbnail} size={42} source={source} />
              ) : (
                <Avatar.Image style={styles.mediaListItemThumbnail} size={42} source={{ uri: DEFAULT_IMAGE }} />
              )
            ) : (
              <></>
            )}
          </View>
        ) : showThumbnail ? (
          source ? (
            <View style={styles.mediaListItem}>
              <Avatar.Image style={styles.mediaListItemThumbnail} size={42} source={source} />
            </View>
          ) : (
            <View style={styles.mediaListItem}>
              <Avatar.Image style={styles.mediaListItemThumbnail} size={42} source={{ uri: DEFAULT_IMAGE }} />
            </View>
          )
        ) : null
      }
      right={() => showActions === true && <IconButton icon="chevron-right" color={theme.colors.accent} onPress={onViewDetail} />}
    />
  );
};
