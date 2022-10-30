import React, { ReactNode } from 'react';
import styles, { theme } from 'mediashare/styles';
import { KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, View, Text, Keyboard, Platform } from 'react-native';
import { Portal, Dialog, Button, Avatar, Card } from 'react-native-paper';
import { useAppSelector } from 'mediashare/store';
import { useDispatch } from 'react-redux';
import { clearError } from 'mediashare/store/modules/appState';
import { LoadingSpinnerProps } from 'mediashare/components/hoc/withLoadingSpinner';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { GlobalStateProps } from 'mediashare/core/globalState';
type withProps<T1, T2> = T1 & T2;
type WithNavProps = withProps<MaterialBottomTabScreenProps<any>, LoadingSpinnerProps>;

// @ts-ignore
export interface PageProps extends WithNavProps {
  globalState?: GlobalStateProps;
  route?: any;
}

export interface PageContainerProps {
  children?: ReactNode;
}

export interface PageContentProps {
  refreshControl?: any;
  children?: any;
  style?: any;
}

export function PageContent({ children }: PageContentProps) {
  return (
    <View style={styles.pageContent}>
      <View>
        <Card>
          <Card.Content>{children}</Card.Content>
        </Card>
      </View>
    </View>
  );
}

export function KeyboardAvoidingPageContent({ children }: PageContentProps) {
  return (
    <View style={styles.pageContent}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.pageContent} keyboardVerticalOffset={100}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card>
            <Card.Content>{children}</Card.Content>
          </Card>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export interface PageActionsProps {
  children?: any;
  style?: any;
}

export function PageActions({ children, style }: PageActionsProps) {
  const mergedStyles = Object.assign({}, styles.pageActions, style);
  return <View style={mergedStyles}>{children}</View>;
}

export function PageContainer({ children }: PageContainerProps) {
  const dispatch = useDispatch();
  const app = useAppSelector((state) => state?.app);
  const hideDialog = function () {
    dispatch(clearError());
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Portal>
        <Dialog visible={app.hasError} onDismiss={hideDialog}>
          <Card.Title
            title={app.error.name}
            left={(props) => <Avatar.Icon color={theme.colors.text} style={{ backgroundColor: theme.colors.error }} {...props} icon="error" />}
            // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
          />
          <Card.Content style={{ maxHeight: '80%', overflow: 'scroll' }}>
            <Text style={{ fontSize: 13 }}>{app.error.message}</Text>
          </Card.Content>
          <Dialog.Actions style={{ paddingTop: 0 }}>
            <Button mode="text" dark color={theme.colors.primary} onPress={hideDialog}>
              Dismiss
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {children}
    </SafeAreaView>
  );
}

export default PageContainer;
