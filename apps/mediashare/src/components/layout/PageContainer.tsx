import React, { ReactNode } from 'react';
import themeStyles, { theme } from '../../styles';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableWithoutFeedback, View, Text, Keyboard, Platform } from 'react-native';
import { Portal, Dialog, Button, Avatar, Card } from 'react-native-paper';
import { useAppSelector } from '../../state';
import { useDispatch } from 'react-redux';
import { clearError } from '../../state/modules/app-state';
import { LoadingSpinnerProps } from '../hoc/withLoadingSpinner';

import styles from '../../styles';

export interface PageProps extends LoadingSpinnerProps {
  navigation: any;
  route: any;
}

export interface PageContainerProps {
  children: ReactNode;
}

export interface PageContentProps {
  refreshControl?: any;
  children?: any;
  style?: any;
}

export function PageContent({ refreshControl, children }: PageContentProps) {
  return (
    <View style={styles.pageContent}>
      {/*<Searchbar style={{ marginBottom: 15 }} placeholder="" value={''} />*/}
      <ScrollView refreshControl={refreshControl}>{children}</ScrollView>
    </View>
  );
}

export function KeyboardAvoidingPageContent({ refreshControl, children }: PageContentProps) {
  return (
    <View style={styles.pageContent}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.pageContent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView refreshControl={refreshControl}>{children}</ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export function PageActions({ children, style }) {
  const mergedStyles = Object.assign({}, styles.pageActions, style);
  return <View style={mergedStyles}>{children}</View>;
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
    <SafeAreaView style={themeStyles.pageContainer}>
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

export default PageContainer;
