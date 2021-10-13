import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Checkbox, Divider, Headline, List } from 'react-native-paper';
import { theme } from '../../styles';

interface ContactListItemProps {
  userId: string;
  title: string;
  description: string;
  avatar: string;
  showFollow?: boolean;
  selectable?: boolean;
  checked?: boolean;
  onChecked?: (bool: boolean) => void;
  onViewDetail?: (userId: any) => void;
  showActions?: boolean;
  showLetterLabel: boolean;
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
  onChecked = () => {},
  checked,
}: ContactListItemProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <View>
      <List.Item
        key={userId}
        style={styles.listItem}
        onPress={onPress}
        title={title}
        description={`${description}`}
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
        right={() => (
          <View style={{ paddingVertical: 5 }}>
            {showFollow && (
              <Button mode={selectable ? 'contained' : 'outlined'} style={styles.followButton} disabled={selectable}>
                Following
              </Button>
            )}
          </View>
        )}
      />
      <Divider />
    </View>
  );

  async function onPress() {
    if (selectable) {
      setIsChecked(!isChecked);
      onChecked(!isChecked);
    } else if (onViewDetail) {
      onViewDetail(userId);
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  listItem: { margin: 0, padding: 5, marginTop: 5, justifyContent: 'center' },
  leftOuterWrapper: { flexDirection: 'row', width: 100, justifyContent: 'space-between' },
  letterLabelWrapper: { display: 'flex', justifyContent: 'center', alignContent: 'center' },
  headline: { marginLeft: 10, color: theme.colors.primary },
  avatarWrapper: { display: 'flex', justifyContent: 'center', alignContent: 'center' },
  followButton: { justifyContent: 'center', borderColor: theme.colors.primary, transform: [{ scale: 0.75 }] },
});

export default ContactListItem;
