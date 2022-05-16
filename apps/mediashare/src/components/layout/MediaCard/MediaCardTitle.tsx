import React from 'react';
import { Avatar, Card, IconButton, Title, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import { getAuthorText, getUsername } from 'mediashare/utils';
import { theme } from 'mediashare/styles';

import { UserDto } from 'mediashare/rxjs-api';

export const DEFAULT_AVATAR = 'https://i.pinimg.com/originals/db/fa/08/dbfa0875b8925919a3f16d53d9989738.png';

export interface MediaCardTitleProps {
  title?: string;
  creator: UserDto;
  showActions?: boolean;
  showThumbnail?: boolean;
  onActionsClicked?: () => void;
}

export const MediaCardTitle: React.FC<MediaCardTitleProps> = ({
  title = '',
  creator = {} as UserDto,
  showActions = false,
  showThumbnail = true,
  onActionsClicked = () => {},
}: MediaCardTitleProps) => {
  return creator ? (
    <Card.Title
      style={{ marginTop: 25, marginBottom: 25 }}
      title={<Title style={defaultStyles.titleText}>{title}</Title>}
      titleStyle={defaultStyles.title}
      titleNumberOfLines={2}
      // TODO: Stupid component doesn't render right on Android if we use a View to wrap, but then the whole f*cking thing appears on a single line!
      subtitle={
        <View style={defaultStyles.subtitle}>
          <Text style={defaultStyles.author}>@{getAuthorText(creator)}</Text>
        </View>
      }
      subtitleStyle={defaultStyles.subtitle}
      leftStyle={defaultStyles.avatar}
      left={() =>
        showThumbnail &&
        creator?.imageSrc && (
          <View>
            <Avatar.Image source={{ uri: creator?.imageSrc || DEFAULT_AVATAR }} size={52} />
          </View>
        )
      }
      right={(buttonProps: any) => showActions && <IconButton {...buttonProps} icon="more-vert" onPress={onActionsClicked} />}
    />
  ) : null;
};

const defaultStyles = StyleSheet.create({
  avatar: {
    width: 50,
  },
  title: {
    marginBottom: 4,
  },
  titleText: {
    color: theme.colors.text,
    fontSize: 15,
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  author: {
    fontSize: 14,
  },
  username: {
    color: theme.colors.primary,
    fontSize: 14,
  },
  description: {
    marginBottom: 15,
    fontSize: 15,
  },
  descriptionWithSocial: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 15,
  },
  card: {
    paddingTop: 5,
    margin: 0,
  },
});
