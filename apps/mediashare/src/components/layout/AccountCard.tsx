import React from 'react';

import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Caption, Title, Subheading } from 'react-native-paper';

import { theme } from '../../styles';

interface AccountCardProps {
  image: string;
  likes?: number;
  shares?: number;
  shared?: number;
  title: string;
  email: string;
  phoneNumber: string;
  showSocial: boolean;
  onProfileImageClicked?: () => void;
}

// function AccountCard({ image, likes, shares, shared, fullName: title, phoneNumber: contact, email: company }: AccountCardProps) {
//   title: string;
//   company?: string;
//   email: string;
//   phoneNumber: string;
//   showSocial?: boolean;
//   likes?: number;
//   shares?: number;
//   shared?: number;
// }

export function AccountCard({ title, email, image, likes, shares, shared, showSocial = false, onProfileImageClicked = () => {} }: AccountCardProps) {
  return (
    <View style={{ height: 200 }}>
      <View style={styles.container}>
        <View style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableWithoutFeedback onPress={onProfileImageClicked}>
            <Avatar.Image source={{ uri: image }} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flex: 3 }}>
          <Title style={{ color: '#222222' }}>{title}</Title>
          <Subheading style={{ fontSize: 11, color: theme.colors.accentDarker }}>{email}</Subheading>
        </View>
      </View>
      {showSocial && (
        <View style={styles.container}>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 30,
    paddingBottom: 0,
  },
  labelledElement: { display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column' },
});

export default AccountCard;
