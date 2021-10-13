import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { IconButton, Card, Divider, Menu } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface ShareItemCardProps {
  date: string;
  title: string;
  image: string;
  read: boolean;
  onDelete: () => void;
  onView: () => void;
}

export function ShareItemCard({ date, title, onDelete, onView, image, read }: ShareItemCardProps) {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Card mode="elevated" onPress={() => setVisible(!visible)}>
        <Card.Title
          title={title}
          left={() => <MaterialIcons name={read ? 'visibility' : 'visibility-off'} size={24} />}
          titleStyle={{ fontSize: 16 }}
          subtitle={new Date(date).toDateString()}
          right={() => (
            // <View style={styles.buttonContainer}>
            //   <IconButton icon="delete-outline" color={theme.colors.primaryText} size={20} onPress={onDelete} />
            //   <IconButton icon="play-circle-filled" color={theme.colors.primaryText} size={20} onPress={onView} />
            // </View>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <IconButton icon={'more-vert'} onPress={() => setVisible(!visible)}>
                  Show menu
                </IconButton>
              }
            >
              {/* TODO: If we watch from here and the user is admin or subscriber eventually the routing messes up we need to change stack navigators somehow */}
              {/* <Menu.Item icon={'play-circle-filled'} onPress={onView} title="Watch" />
              <Divider /> */}
              <Menu.Item icon={'delete'} onPress={onDelete} title="Delete" />
            </Menu>
          )}
        >
          {/* </View> */}
        </Card.Title>
      </Card>
      <Divider />
    </View>
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
