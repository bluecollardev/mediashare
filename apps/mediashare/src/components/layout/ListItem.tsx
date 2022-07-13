import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Checkbox, Divider, Headline, IconButton, List, Text } from 'react-native-paper';
import { theme } from 'mediashare/styles';

interface ListItemProps {
  itemId: string;
  title: string;
  description: string;
  avatar?: string | undefined;
  showFollow?: boolean;
  selectable?: boolean;
  checked?: boolean;
  onChecked?: (bool: boolean, itemId: string) => void;
  onViewDetail?: (itemId: any) => void;
  showLetterLabel?: boolean;
  showActions?: boolean;
  iconRight?: string;
  iconRightColor?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  showFollow = true,
  description = '',
  title = '',
  avatar,
  itemId = '',
  showLetterLabel = false,
  onViewDetail,
  selectable,
  checked,
  onChecked = () => {},
  showActions = true,
  iconRight = 'chevron-right',
  iconRightColor = theme.colors.default,
}: ListItemProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <View>
      <List.Item
        key={itemId}
        style={defaultStyles.listItem}
        onPress={onPress}
        title={title}
        titleStyle={defaultStyles.titleText}
        description={
          <>
            <Text style={defaultStyles.description}>{description}</Text>
          </>
        }
        left={() =>
          selectable ? (
            <View style={defaultStyles.leftOuterWrapper}>
              <Checkbox status={isChecked ? 'checked' : 'indeterminate'} color={isChecked ? theme.colors.success : theme.colors.disabled} />
              {avatar && (
                <View style={defaultStyles.avatarWrapper}>
                  <Avatar.Image source={avatar ? { uri: avatar } : undefined} size={40} />
                </View>
              )}
            </View>
          ) : showLetterLabel || avatar ? (
            <View style={defaultStyles.leftOuterWrapper}>
              {showLetterLabel && (
                <View style={defaultStyles.letterLabelWrapper}>{showLetterLabel && <Headline style={defaultStyles.headline}>{title[0]}</Headline>}</View>
              )}
              {avatar && (
                <View style={defaultStyles.avatarWrapper}>
                  <Avatar.Image source={avatar ? { uri: avatar } : undefined} size={40} />
                </View>
              )}
            </View>
          ) : (
            <View style={defaultStyles.leftOuterWrapperHidden} />
          )
        }
        right={() => {
          return showActions ? (
            <IconButton icon={iconRight} iconColor={iconRightColor} onPress={() => onViewDetail(itemId)} />
          ) : (
            <View>
              {showFollow && (
                <Button mode={selectable ? 'contained' : 'outlined'} style={defaultStyles.followButton} disabled={selectable}>
                  Following
                </Button>
              )}
            </View>
          );
        }}
      />
      <Divider />
    </View>
  );

  async function onPress() {
    if (selectable) {
      setIsChecked(!isChecked);
      onChecked(!isChecked, itemId);
    } else if (onViewDetail) {
      onViewDetail(itemId);
    }
  }
};

const defaultStyles = StyleSheet.create({
  titleText: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  description: {
    color: theme.colors.textDarker,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 4,
  },
  listItem: { margin: 0, justifyContent: 'center' },
  leftOuterWrapperHidden: { flexDirection: 'row', width: 15, justifyContent: 'space-between' },
  leftOuterWrapper: { flexDirection: 'row', width: 100, justifyContent: 'space-between' },
  letterLabelWrapper: { display: 'flex', justifyContent: 'center', alignContent: 'center' },
  headline: { marginLeft: 10, color: theme.colors.default },
  avatarWrapper: { display: 'flex', justifyContent: 'center', alignContent: 'center' },
  followButton: { justifyContent: 'center', borderColor: theme.colors.primary, transform: [{ scale: 0.75 }] },
});
