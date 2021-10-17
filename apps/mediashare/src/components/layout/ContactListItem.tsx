import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Checkbox, Divider, Headline, IconButton, List, Text } from 'react-native-paper';
import { theme } from '../../styles';
import { shortenText } from '../../utils';

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
  iconRightColor = theme.colors.accent,
}: ContactListItemProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <View>
      <List.Item
        key={userId}
        style={styles.listItem}
        onPress={onPress}
        title={title}
        description={
          <>
            <Text style={styles.description}>{description}</Text>
          </>
        }
        left={() =>
          selectable ? (
            <View style={styles.leftOuterWrapper}>
              <Checkbox status={isChecked ? 'checked' : 'indeterminate'} color={isChecked ? theme.colors.success : theme.colors.disabled} />
              <View style={styles.avatarWrapper}>
                <Avatar.Image source={avatar ? { uri: avatar } : undefined} size={40} />
              </View>
            </View>
          ) : (
            <View style={styles.leftOuterWrapper}>
              <View style={styles.letterLabelWrapper}>{showLetterLabel && <Headline style={styles.headline}>{title[0]}</Headline>}</View>
              <View style={styles.avatarWrapper}>
                <Avatar.Image source={avatar ? { uri: avatar } : undefined} size={40} />
              </View>
            </View>
          )
        }
        right={() => {
          return showActions ? (
            <IconButton icon={iconRight} color={iconRightColor} onPress={onViewDetail} />
          ) : (
            <View>
              {showFollow && (
                <Button mode={selectable ? 'contained' : 'outlined'} style={styles.followButton} disabled={selectable}>
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

const styles = StyleSheet.create({
  description: {
    color: '#666666',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4,
  },
  listItem: { margin: 0, justifyContent: 'center', backgroundColor: '#ffffff' },
  leftOuterWrapper: { flexDirection: 'row', width: 100, justifyContent: 'space-between' },
  letterLabelWrapper: { display: 'flex', justifyContent: 'center', alignContent: 'center' },
  headline: { marginLeft: 10, color: theme.colors.primary },
  avatarWrapper: { display: 'flex', justifyContent: 'center', alignContent: 'center' },
  followButton: { justifyContent: 'center', borderColor: theme.colors.primary, transform: [{ scale: 0.75 }] },
});

export default ContactListItem;
