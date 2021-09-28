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
  iconRight?: string;
  iconRightColor?: string;
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
  iconRight = 'chevron-right',
  iconRightColor = theme.colors.accent,
}: MediaListItemProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  const DEFAULT_IMAGE = usePreviewImage();

  return (
    <List.Item
      title={title}
      description={() => {
        return <Caption>{description}</Caption>;
      }}
      onPress={() => {
        if (selectable) {
          setIsChecked(!isChecked);
          onChecked(!isChecked);
        } else if (onViewDetail) {
          onViewDetail();
        }
      }}
      left={() =>
        selectable ? (
          <View style={styles.mediaListItem}>
            <Checkbox status={isChecked ? 'checked' : 'indeterminate'} color={isChecked ? theme.colors.success : theme.colors.disabled} />
            {showThumbnail ? (
              image ? (
                <Avatar.Image style={styles.mediaListItemThumbnail} size={42} source={{ uri: image }} />
              ) : (
                <Avatar.Image style={styles.mediaListItemThumbnail} size={42} source={{ uri: DEFAULT_IMAGE }} />
              )
            ) : (
              <></>
            )}
          </View>
        ) : showThumbnail ? (
          image ? (
            <View style={styles.mediaListItem}>
              <Avatar.Image style={styles.mediaListItemThumbnail} size={42} source={{ uri: image }} />
            </View>
          ) : (
            <View style={styles.mediaListItem}>
              <Avatar.Image style={styles.mediaListItemThumbnail} size={42} source={{ uri: DEFAULT_IMAGE }} />
            </View>
          )
        ) : null
      }
      right={() => showActions === true && <IconButton icon={iconRight} color={iconRightColor} onPress={onViewDetail} />}
    />
  );
};
