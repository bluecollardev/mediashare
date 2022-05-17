import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { shortenText } from 'mediashare/utils';
import { theme } from 'mediashare/styles';

interface MediaListItemDescriptionData {
  author?: string;
  username?: string;
  description?: string;
  itemCount?: string | number;
}

interface MediaListItemDescriptionProps {
  showAuthor?: boolean;
  showUsername?: boolean;
  showDescription?: boolean;
  showItemCount?: boolean;
  maxChars?: number;
  data: MediaListItemDescriptionData;
}

// mediaIds?.length || mediaItems?.length || 0
export const MediaListItemDescription = ({ data, showAuthor = true, showUsername = true, showDescription = false, showItemCount = false, maxChars = 25 }: MediaListItemDescriptionProps) => {
  const { username = '', author = '', description = '', itemCount = 0 } = data;
  return (
    <View style={styles.details}>
      {(showAuthor || showUsername) && (
        <View style={styles.createdBy}>
          {showAuthor && <Text style={styles.author}>{author}</Text>}
          {showUsername && <Text style={styles.username}>@{username}</Text>}
        </View>
      )}
      {showItemCount && <Text style={{ ...styles.videoCount }}>{itemCount} videos</Text>}
      {showDescription && <Text style={styles.description}>{shortenText(description || '', maxChars)}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  createdBy: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
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
  description: {
    flex: 0,
    width: '100%',
    color: theme.colors.text,
    fontFamily: theme.fonts.thin.fontFamily,
    fontSize: 13,
    marginTop: 2,
    marginBottom: 4,
  },
  videoCount: {
    color: theme.colors.textDarker,
    fontFamily: theme.fonts.thin.fontFamily,
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
  },
});

