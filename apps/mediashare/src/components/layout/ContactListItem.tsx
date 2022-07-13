import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Checkbox, Divider, Headline, IconButton, List, Text } from 'react-native-paper';
import { theme } from 'mediashare/styles';

interface ContactListItemProps {
  userId: string;
  title: string;
  description: string;
  avatar: string;
  showFollow?: boolean;
  selectable?: boolean;
  checked?: boolean;
  onChecked?: (bool: boolean, userId: string) => void;
  onViewDetail?: (userId: any) => void;
  showLetterLabel: boolean;
  showActions?: boolean;
  iconRight?: string;
  iconRightColor?: string;
}

export const ContactListItem: React.FC<ContactListItemProps> = ({
  showFollow = true,
  description = '',
  title = '',
  avatar,
  userId = '',
  showLetterLabel = false,
  onViewDetail,
  selectable,
  checked,
  onChecked = () => {},
  showActions = true,
  iconRight = 'chevron-right',
  iconRightColor = theme.colors.default,
}: ContactListItemProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <View>
      <List.Item
        key={userId}
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
              <View style={defaultStyles.avatarWrapper}>
                <Avatar.Image source={avatar ? { uri: avatar } : undefined} size={40} />
              </View>
            </View>
          ) : (
            <View style={defaultStyles.leftOuterWrapper}>
              <View style={defaultStyles.letterLabelWrapper}>{showLetterLabel && <Headline style={defaultStyles.headline}>{title[0]}</Headline>}</View>
              <View style={defaultStyles.avatarWrapper}>
                <Avatar.Image source={avatar ? { uri: avatar } : undefined} size={40} />
              </View>
            </View>
          )
        }
        right={() => {
          return showActions ? (
            <IconButton icon={iconRight} iconColor={iconRightColor} onPress={() => onViewDetail(userId)} />
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
      onChecked(!isChecked, userId);
    } else if (onViewDetail) {
      onViewDetail(userId);
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
  leftOuterWrapper: { flexDirection: 'row', width: 100, justifyContent: 'space-between' },
  letterLabelWrapper: { display: 'flex', justifyContent: 'center', alignContent: 'center' },
  headline: { marginLeft: 10, color: theme.colors.default },
  avatarWrapper: { display: 'flex', justifyContent: 'center', alignContent: 'center' },
  followButton: { justifyContent: 'center', borderColor: theme.colors.primary, transform: [{ scale: 0.75 }] },
});
