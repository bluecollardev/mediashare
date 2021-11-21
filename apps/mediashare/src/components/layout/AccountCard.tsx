import React, { useState } from 'react';

import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Caption, Title, Subheading, Card, Menu, IconButton } from 'react-native-paper';

import { theme } from '../../styles';
import { useAppSelector } from '../../store';
import * as R from 'remeda';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface AccountCardProps {
  image: string;
  likes?: number;
  shares?: number;
  shared?: number;
  title: string;
  email: string;
  phoneNumber: string;
  showSocial?: boolean;
  showActions?: boolean;
  onProfileImageClicked?: () => void;
  isCurrentUser?: boolean;
}

export const AccountCard = ({
  title,
  email,
  image,
  likes,
  shares,
  shared,
  showSocial = false,
  showActions = false,
  isCurrentUser = false,
  onProfileImageClicked = () => {},
}: AccountCardProps) => {
  const [visible, setVisible] = useState(false);

  const user = useAppSelector((state) => state.profile.entity);
  const withoutName = () => state?.firstName?.length < 1 || state?.lastName?.length < 1;
  const [state] = useState(R.pick(user, ['firstName', 'email', 'lastName', 'phoneNumber', 'imageSrc']));

  // <MaterialIcons name={read ? 'visibility' : 'visibility-off'} size={24} />
  // <View style={styles.buttonContainer}>
  //   <IconButton icon="delete-outline" color={theme.colors.primaryText} size={20} onPress={onDelete} />
  //   <IconButton icon="play-circle-filled" color={theme.colors.primaryText} size={20} onPress={onView} />
  // </View>
  // <Menu.Item icon={'play-circle-filled'} onPress={() => {}} title="Watch" />
  return (
    <>
      <Card mode="elevated">
        <Card.Title
          style={styles.header}
          left={() =>
            image ? (
              <TouchableWithoutFeedback onPress={onProfileImageClicked}>
                <Avatar.Image size={108} source={{ uri: image }} />
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={onProfileImageClicked}>
                <Avatar.Icon size={108} icon="person" />
              </TouchableWithoutFeedback>
            )
          }
          leftStyle={styles.left}
          title={<Title style={styles.titleText}>{title}</Title>}
          titleStyle={styles.title}
          subtitle={<Subheading style={styles.subtitleText}>{email}</Subheading>}
          subtitleStyle={styles.subtitle}
          right={() =>
            showActions ? (
              <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <IconButton icon="more-vert" onPress={() => setVisible(!visible)}>
                    Show menu
                  </IconButton>
                }
              >
                {isCurrentUser && <Menu.Item icon="delete-forever" onPress={() => {}} title="Delete Account" />}
                {!isCurrentUser && <Menu.Item icon="person-remove" onPress={() => {}} title="Unfollow" />}
              </Menu>
            ) : null
          }
          rightStyle={styles.right}
        />
        <Card.Content>
          {withoutName() && (
            <Card>
              <Card.Title
                title={'A name is required'}
                left={(props) => <MaterialIcons {...props} name="warning" color={theme.colors.error} size={30} />}
                // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
              />
            </Card>
          )}
        </Card.Content>
        {showSocial && (
          <View style={styles.social}>
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
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  title: {
    marginLeft: 15,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    height: 20,
  },
  subtitle: {
    marginLeft: 15,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  titleText: {
    color: '#444',
    fontSize: 18,
  },
  subtitleText: {
    fontSize: 11,
    color: theme.colors.primary,
  },
  left: {
    flex: 0,
    width: 108,
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 0,
    width: '15%',
    height: 92,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  labelledElement: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export default AccountCard;
