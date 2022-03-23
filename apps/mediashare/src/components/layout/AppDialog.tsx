import React from 'react';
import { Avatar, Button, Card, Dialog, Portal, Text } from 'react-native-paper';
import { theme } from '../../styles';

interface AppDialogProps {
  showDialog: boolean;
  leftActionCb: any;
  rightActionCb: any;
  leftActionLabel: string;
  rightActionLabel: string;
  onDismiss: any;
  title: string;
  subtitle: string;
}

function AppDialog({ leftActionLabel, rightActionLabel, leftActionCb, rightActionCb, showDialog, onDismiss, title, subtitle }: AppDialogProps) {
  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={onDismiss}>
        <Card.Title
          title={title}
          left={(props) => <Avatar.Icon color={theme.colors.text} style={{ backgroundColor: theme.colors.error }} {...props} icon="warning" />}
        />
        <Card.Content style={{ marginBottom: 15 }}>
          <Text>{subtitle}</Text>
        </Card.Content>
        <Dialog.Actions style={{ paddingTop: 0 }}>
          <Button mode="text" color={theme.colors.text} onPress={leftActionCb}>
            {leftActionLabel}
          </Button>
          <Button mode="contained" dark color={theme.colors.error} onPress={rightActionCb}>
            {rightActionLabel}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default AppDialog;
