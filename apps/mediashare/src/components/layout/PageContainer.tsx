import React, { ReactNode, useState } from 'react';
import themeStyles, { theme } from '../../styles';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { Portal, Dialog, Paragraph, List, Button, Avatar, Subheading, Title, Banner, Card } from 'react-native-paper';
import { useAppSelector } from '../../state';
import { useDispatch } from 'react-redux';
import { clearError } from '../../state/modules/app-state';
import ContentTheme from '../../theme/components/Content';
interface PageContainerProps {
  children: ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  const dispatch = useDispatch();
  const app = useAppSelector((state) => state.app);
  // const [visible, setVisible] = useState(false);
  const hideDialog = function () {
    dispatch(clearError());
    // setVisible(false);
  };
  return (
    <SafeAreaView style={themeStyles.container}>
      <View>
        <Portal>
          <Dialog visible={app.hasError} onDismiss={hideDialog}>
            <Card.Title
              title={app.error.name}
              subtitle={app.error.message}
              left={(props) => <Avatar.Icon color={theme.colors.primaryTextLighter} style={{ backgroundColor: theme.colors.error }} {...props} icon="folder" />}
              // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
            />
            <Dialog.Actions style={{ paddingTop: 0 }}>
              <Button mode={'text'} dark color={theme.colors.primary} onPress={hideDialog}>
                Cancel
              </Button>
            </Dialog.Actions>

            {/* <Dialog.Title>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Avatar.Icon icon={'alert'} size={36} />
                <Title>Error</Title>
              </View>
            </Dialog.Title>
            <Dialog.Content>
              <Subheading>Application has an error message</Subheading>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode={'text'} dark color={theme.colors.primary} onPress={hideDialog}>
                Cancel
              </Button>
            </Dialog.Actions> */}
          </Dialog>
        </Portal>
      </View>
      {/* <Button mode={'contained'} color={theme.colors.primary} onPress={() => setVisible(true)}>
        showDialog
      </Button> */}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});

export default PageContainer;
