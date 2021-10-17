import React, { useState } from 'react';

import { usePreviewImage } from '../../hooks/UsePreviewImage';

import { View } from 'react-native';
import { Caption, Checkbox, IconButton, List } from 'react-native-paper';

import styles, { theme } from '../../styles';
import { MediaPreview } from './MediaPreview';

export interface MediaListItemProps {
  navigation?: any;
  title?: string;
  author?: string;
  description?: any;
  image?: string;
  showThumbnail?: boolean;
  selectable?: boolean;
  checked?: boolean;
  onChecked?: (bool: boolean) => void;
  onViewDetail?: () => void;
  showActions?: boolean;
  iconRight?: string;
  iconRightColor?: string;
}

export const MediaListItem: React.FC<MediaListItemProps> = ({
  checked,
  image,
  title,
  description,
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

  const mediaPreviewProps = {
    thumbnail: image || DEFAULT_IMAGE,
    width: 104,
    height: 78,
    onPress,
  };

  return (
    <List.Item
      title={title}
      description={() => {
        return <Caption>{description}</Caption>;
      }}
      descriptionNumberOfLines={1}
      onPress={onPress}
      left={() =>
        selectable ? (
          <View style={styles.mediaListItem}>
            <Checkbox status={isChecked ? 'checked' : 'indeterminate'} color={isChecked ? theme.colors.success : theme.colors.disabled} />
            {showThumbnail ? image ? <MediaPreview {...mediaPreviewProps} /> : <MediaPreview {...mediaPreviewProps} /> : null}
          </View>
        ) : showThumbnail ? (
          image ? (
            <View style={styles.mediaListItem}>
              <MediaPreview {...mediaPreviewProps} />
            </View>
          ) : (
            <View style={styles.mediaListItem}>
              <MediaPreview {...mediaPreviewProps} />
            </View>
          )
        ) : null
      }
      right={() => showActions === true && <IconButton icon={iconRight} color={iconRightColor} onPress={onViewDetail} />}
    />
  );

  async function onPress() {
    if (selectable) {
      setIsChecked(!isChecked);
      onChecked(!isChecked);
    } else if (onViewDetail) {
      onViewDetail();
    }
  }
};
