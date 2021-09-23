import React, { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Caption, List, Subheading } from 'react-native-paper';

interface AccountCardProps {
  image: string;
  likes: number;
  shares: number;
  shared: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

function AccountCard({ image, likes, shares, shared, fullName: title, phoneNumber: contact, email: company }: AccountCardProps) {
  return (
    <View>
      <View style={styles.container}>
        <Avatar.Image source={{ uri: image }} />
        <View style={styles.labelledElement}>
          <Subheading>{likes}</Subheading>
          <Caption>Likes</Caption>
        </View>
        <View style={styles.labelledElement}>
          <Subheading>{shares}</Subheading>
          <Caption>Shares</Caption>
        </View>
        <View style={styles.labelledElement}>
          <Subheading>{shared}</Subheading>
          <Caption>Shared</Caption>
        </View>
      </View>
      <List.Item
        title={title}
        description={() => {
          return (
            <View style={{ flexDirection: 'column' }}>
              <Text>{company}</Text>
              <Caption>{contact}</Caption>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  labelledElement: { display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column' },
});

export default AccountCard;
