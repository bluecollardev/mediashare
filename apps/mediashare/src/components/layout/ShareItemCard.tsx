import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { MediaListItem } from './MediaListItem';
import { theme } from 'mediashare/styles';

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
  // const [visible, setVisible] = useState(false);
  return (
    <View style={styles.sharedItem}>
      <MediaListItem
        key={title}
        title={title}
        titleStyle={styles.titleText}
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
  titleText: {
    marginBottom: 4,
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  description: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: theme.colors.textDarker,
    fontFamily: theme.fonts.thin.fontFamily,
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
