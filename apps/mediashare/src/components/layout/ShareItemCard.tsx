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
}

export function ShareItemCard({ date, title, onDelete, onView, image, read, selectable, showActions }: ShareItemCardProps) {
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
            <Menu visible={visible} onDismiss={() => setVisible(false)} anchor={() => null}>
              <Menu.Item icon="play-circle-filled" onPress={onView} title="Watch" />
              <Divider />
              <Menu.Item icon="delete" onPress={onDelete} title="Unshare" />
            </Menu>
          </View>
        }
        showThumbnail={true}
        image={image}
        showActions={showActions}
        selectable={selectable}
        onViewDetail={() => setVisible(!visible)}
        iconRight="remove-circle"
        iconRightColor={theme.colors.error}
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
    color: '#666666',
  },
  visibilityIcon: {
    flex: 0,
    width: 16,
    marginRight: 5,
    color: '#666666',
  },
  sharedItem: {
    margin: 0,
    padding: 0,
    backgroundColor: '#ffffff',
    // padding: 5,
    // alignContent: 'center',
    // justifyContent: 'space-between',
  },
});
