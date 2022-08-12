import React from 'react';
import { Avatar, Card, IconButton, Title, Text } from 'react-native-paper';
import { View, StyleSheet, Platform } from 'react-native';

import { getAuthorText } from 'mediashare/utils';
import { theme } from 'mediashare/styles';

import { AuthorProfileDto } from 'mediashare/rxjs-api';

export const DEFAULT_AVATAR = 'https://i.pinimg.com/originals/db/fa/08/dbfa0875b8925919a3f16d53d9989738.png';

export interface MediaCardTitleProps {
  title?: string;
  authorProfile?: AuthorProfileDto;
  showActions?: boolean;
  showThumbnail?: boolean;
  onActionsClicked?: () => void;
  style?: any;
}

export const MediaCardTitle: React.FC<MediaCardTitleProps> = ({
  title = '',
  authorProfile = {} as AuthorProfileDto,
  showActions = false,
  showThumbnail = true,
  onActionsClicked = () => {},
  style = {},
}: MediaCardTitleProps) => {
  return authorProfile ? (
    <Card.Title
      style={{ ...defaultStyles.component, ...style }}
      title={<Title style={defaultStyles.titleText}>{title}</Title>}
      titleStyle={defaultStyles.title}
      titleNumberOfLines={2}
      // TODO: Stupid component doesn't render right on Android if we use a View to wrap, but then the whole f*cking thing appears on a single line!
      subtitle={
        <View style={defaultStyles.subtitle}>
          <View style={defaultStyles.createdBy}>
            {authorProfile?.authorName && <Text style={defaultStyles.author}>{authorProfile?.authorName}</Text>}
            {authorProfile?.authorUsername && <Text style={defaultStyles.username}>@{authorProfile?.authorUsername}</Text>}
          </View>
        </View>
      }
      subtitleStyle={defaultStyles.subtitle}
      leftStyle={showThumbnail ? defaultStyles.avatar : undefined}
      left={showThumbnail ? () => {
        return authorProfile?.authorImage ? (
          <View>
            <Avatar.Image source={{ uri: authorProfile?.authorImage || DEFAULT_AVATAR }} size={52} />
          </View>
        ) : null;
      } : undefined}
      right={(buttonProps: any) => showActions && <IconButton {...buttonProps} icon="more-vert" onPress={onActionsClicked} />}
    />
  ) : null;
};

const defaultStyles = StyleSheet.create({
  component: {
    marginTop: 25,
    marginBottom: 25,
  },
  avatar: {
    width: 50,
  },
  title: {
    marginBottom: 4,
  },
  titleText: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.medium.fontFamily,
    lineHeight: Platform.OS === 'android' ? 24 : 20,
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  createdBy: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  author: {
    color: theme.colors.text,
    fontFamily: theme.fonts.thin.fontFamily,
    fontSize: 13,
    marginBottom: 2,
  },
  username: {
    color: theme.colors.textDarker,
    fontFamily: theme.fonts.thin.fontFamily,
    fontSize: 13,
    marginBottom: 2,
    marginLeft: 2,
  },
});
