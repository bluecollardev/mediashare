import React, { useState } from 'react';

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
  showPlayableIcon?: boolean;
  selectable?: boolean;
  checked?: boolean;
  onChecked?: (checked: boolean, item?: any) => void;
  onViewDetail?: () => void;
  showActions?: boolean | 'left' | 'right';
  iconLeft?: string;
  iconLeftColor?: string;
  iconRight?: string;
  iconRightColor?: string;
  titleStyle?: any;
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
  showPlayableIcon = true,
  iconLeft = '',
  iconLeftColor = theme.colors.default,
  iconRight = 'chevron-right',
  iconRightColor = theme.colors.default,
  ...rest
}: MediaListItemProps & any) => {
  const [isChecked, setIsChecked] = useState(checked);
  const mediaPreviewProps = {
    thumbnail: image,
    width: 104,
    height: 78,
    onPress,
  };

  description = typeof description === 'string' ? <Caption>{description}</Caption> : description;

  return (
    <List.Item
      title={title || null}
      description={description}
      descriptionNumberOfLines={1}
      // It doesn't feel right to have the whole thing be a tap target when we're displaying actions on the left
      onPress={showActions !== 'left' ? onPress : undefined}
      left={() =>
        selectable ? (
          <View style={styles.mediaListItem}>
            <Checkbox status={isChecked ? 'checked' : 'indeterminate'} color={isChecked ? theme.colors.success : theme.colors.disabled} />
            {showThumbnail ? image ? <MediaPreview {...mediaPreviewProps} /> : <MediaPreview {...mediaPreviewProps} /> : null}
          </View>
        ) : showThumbnail ? (
          image ? (
            <View style={styles.mediaListItem}>
              {showActions === 'left' && <IconButton icon={iconLeft} color={iconLeftColor} onPress={onViewDetail} />}
              <MediaPreview {...mediaPreviewProps} showPlayableIcon={showPlayableIcon} />
            </View>
          ) : (
            <View style={styles.mediaListItem}>
              {showActions === 'left' && <IconButton icon={iconLeft} color={iconLeftColor} onPress={onViewDetail} />}
              <MediaPreview {...mediaPreviewProps} />
            </View>
          )
        ) : null
      }
      right={() => (showActions === 'right' || showActions === true) && <IconButton icon={iconRight} color={iconRightColor} onPress={onViewDetail} />}
      {...rest}
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
