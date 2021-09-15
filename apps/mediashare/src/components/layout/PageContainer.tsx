import React, { ReactNode } from 'react';
import themeStyles, { theme } from '../../styles';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Portal, Dialog, Button, Avatar, Card } from 'react-native-paper';
import { useAppSelector } from '../../state';
import { useDispatch } from 'react-redux';
import { clearError } from '../../state/modules/app-state';
import { LoadingSpinnerProps } from '../hoc/withLoadingSpinner';

export interface PageProps extends LoadingSpinnerProps {
  navigation: any;
  route: any;
}

export interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
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
              left={(props) => <Avatar.Icon color={theme.colors.primaryTextLighter} style={{ backgroundColor: theme.colors.error }} {...props} icon="error" />}
              // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
            />
            <Card.Content>
              <Text style={{ fontSize: 11 }}>{app.error.message}</Text>
            </Card.Content>
            <Dialog.Actions style={{ paddingTop: 0 }}>
              <Button mode={'text'} dark color={theme.colors.primary} onPress={hideDialog}>
                Dismiss
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>

      {children}
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
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
