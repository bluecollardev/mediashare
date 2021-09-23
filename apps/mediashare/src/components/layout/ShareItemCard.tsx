import React, { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, Caption, IconButton, Card } from 'react-native-paper';
import { theme } from '../../styles';
import FastImage from 'react-native-fast-image';
import ImagedCardView from 'react-native-imaged-card-view';

interface ShareItemCardProps {
  date: string;
  title: string;
  image: string;
  read: boolean;
  onDelete: () => void;
  onView: () => void;
}

function ShareItemCard({ date, title, onDelete, onView, image, read }: ShareItemCardProps) {
  return (
    <Card mode={'outlined'} style={{ borderColor: read ? theme.colors.disabled : theme.colors.error }}>
      <Card.Title
        title={title}
        titleStyle={{ fontSize: 16 }}
        subtitle={new Date(date).toDateString()}
        right={() => (
          <View style={styles.buttonContainer}>
            <IconButton icon="delete-outline" color={theme.colors.primaryText} size={20} onPress={onDelete} />
            <IconButton icon="play-circle-filled" color={theme.colors.primaryText} size={20} onPress={onView} />
          </View>
        )}
      >
        {/* </View> */}
      </Card.Title>
    </Card>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    marginLeft: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  sharedItemCard: {
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    // color: theme.colors.background,
    // padding: 5,
    // alignContent: 'center',
    // justifyContent: 'space-between',
  },
});

export default ShareItemCard;
