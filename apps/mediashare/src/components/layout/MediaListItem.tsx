import React, { useState } from 'react';

import { Platform, StyleSheet, View } from 'react-native';
import { Caption, Checkbox, IconButton, List } from 'react-native-paper';

import { MediaPreview, MediaPreviewProps } from './MediaPreview';
import { MediaListItemDescription } from './MediaListItemDescription';
import { theme } from 'mediashare/styles';

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
  // TODO: Type this!
  mediaPreviewProps?: MediaPreviewProps;
}

const MediaListItem = ({
  checked,
  image,
  title,
  titleStyle = {},
  description,
  onViewDetail,
  onChecked = () => {},
  selectable = true,
  showActions = true,
  showThumbnail = false,
  showPlayableIcon = false,
  iconLeft = '',
  iconLeftColor = theme.colors.default,
  iconRight = 'chevron-right',
  iconRightColor = theme.colors.default,
  mediaPreviewProps,
  ...rest
}: MediaListItemProps & any) => {
  const [isChecked, setIsChecked] = useState(checked);
  const mediaPreviewConfig = {
    thumbnail: image,
    width: 64,
    height: 64,
    onPress,
    ...mediaPreviewProps
  };

  description = typeof description === 'string' ? <Caption>{description}</Caption> : description;

  return (
    <List.Item
      style={defaultStyles.listItem}
      title={title || null}
      titleNumberOfLines={3}
      titleEllipsizeMode="tail"
      titleStyle={{ ...defaultStyles.titleText, ...titleStyle }}
      description={() => <>{description}</>}
      descriptionNumberOfLines={3}
      descriptionEllipsizeMode="tail"
      // It doesn't feel right to have the whole thing be a tap target when we're displaying actions on the left
      onPress={showActions !== 'left' ? onPress : undefined}
      left={() =>
        selectable ? (
          <View style={defaultStyles.mediaListItem}>
            <Checkbox status={isChecked ? 'checked' : 'indeterminate'} color={isChecked ? theme.colors.success : theme.colors.disabled} />
            {showThumbnail ? image ? <MediaPreview {...mediaPreviewConfig} showPlayableIcon={showPlayableIcon} /> : <MediaPreview {...mediaPreviewConfig} showPlayableIcon={showPlayableIcon} /> : null}
          </View>
        ) : showThumbnail ? (
          image ? (
            <View style={defaultStyles.mediaListItem}>
              {showActions === 'left' && <IconButton icon={iconLeft} iconColor={iconLeftColor} onPress={onViewDetail} />}
              <MediaPreview {...mediaPreviewConfig} showPlayableIcon={showPlayableIcon} />
            </View>
          ) : (
            <View style={defaultStyles.mediaListItem}>
              {showActions === 'left' && <IconButton icon={iconLeft} iconColor={iconLeftColor} onPress={onViewDetail} />}
              <MediaPreview {...mediaPreviewConfig} showPlayableIcon={showPlayableIcon} />
            </View>
          )
        ) : null
      }
      right={() =>
        showActions === 'right' || showActions === true ? (
          <View style={defaultStyles.iconRightWrapper}>
            <IconButton icon={iconRight} iconColor={iconRightColor} onPress={onViewDetail} style={defaultStyles.iconButton} />
          </View>
        ) : null
      }
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

MediaListItem.Description = MediaListItemDescription;
export { MediaListItem };

const defaultStyles: any = StyleSheet.create({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  mediaListItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaListItemThumbnail: {
    marginLeft: 5,
    marginRight: 10,
  },
  titleText: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.medium.fontFamily,
    lineHeight: Platform.OS === 'android' ? 20 : 18,
  },
  iconRightWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  iconButton: {
    marginRight: 0,
  },
});
