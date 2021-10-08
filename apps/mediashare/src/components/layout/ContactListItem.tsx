import React, { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Divider, Headline, List } from 'react-native-paper';
import { theme } from '../../styles';

interface ContactListItemProps {
  description: string;
  title: string;
  avatar: string;
  showFollow?: boolean;
  userId: string;
  onClick: (userId) => void;
  showLetterLabel: boolean;
}

function ContactListItem({
  showFollow = false,
  description = '',
  title = '',
  avatar,
  userId = '',
  showLetterLabel = false,
  onClick = () => {},
}: ContactListItemProps) {
  return (
    <View>
      <List.Item
        key={userId}
        style={styles.listItem}
        onPress={() => onClick(userId)}
        title={title}
        description={`${description}`}
        left={() => (
          <View style={styles.leftOuterWrapper}>
            <View style={styles.letterLabelWrapper}>{showLetterLabel && <Headline style={styles.headline}>{title[0]}</Headline>}</View>
            <View style={styles.avatarWrapper}>
              <Avatar.Image source={avatar ? { uri: avatar } : undefined} size={50} />
            </View>
          </View>
        )}
        right={() => (
          <View style={{ paddingVertical: 25 }}>
            {showFollow && (
              <Button mode={'outlined'} style={styles.followButton}>
                Follow
              </Button>
            )}
          </View>
        )}
      />
      <Divider />
    </View>
  );
}

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
  followButton: { justifyContent: 'center', borderColor: theme.colors.primary },
});

export default ContactListItem;
