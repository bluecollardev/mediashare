import React, { useState } from 'react';

import { View, StyleSheet, Text } from 'react-native';
import { Divider, Menu } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MediaListItem } from './MediaListItem';
import { theme } from '../../styles';

interface ShareItemCardProps {
  date: string;
  title: string;
  image: string;
  selectable?: boolean;
  showActions?: boolean;
  read: boolean;
  onDelete: () => void;
  onView: () => void;
  onChecked?: (checked: boolean, item?: any) => void;
}

export function ShareItemCard({ date, title, onDelete, onView, onChecked, image, read, selectable, showActions }: ShareItemCardProps) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.sharedItem}>
      <MediaListItem
        key={title}
        title={title}
        titleStyle={styles.title}
        description={
          <View style={styles.description}>
            <MaterialIcons style={styles.visibilityIcon} name={read ? 'visibility' : 'visibility-off'} size={16} />
            <Text style={styles.date}>{new Date(date).toDateString()}</Text>
          </View>
        }
        showThumbnail={true}
        showPlayableIcon={false}
        image={image}
        showActions={showActions ? 'left' : false}
        selectable={selectable}
        // onViewDetail={() => setVisible(!visible)}
        onViewDetail={onDelete}
        onChecked={onChecked}
        iconLeft="remove-circle"
        iconLeftColor={theme.colors.error}
      />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 4,
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 11,
    color: theme.colors.textDarker,
  },
  visibilityIcon: {
    flex: 0,
    width: 16,
    marginRight: 5,
    color: theme.colors.textDarker,
  },
  sharedItem: {
    margin: 0,
    padding: 0,
    // padding: 5,
    // alignContent: 'center',
    // justifyContent: 'space-between',
  },
});
