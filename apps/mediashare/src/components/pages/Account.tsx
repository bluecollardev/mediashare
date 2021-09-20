import React, { useState } from 'react';

import { withLoadingSpinner } from '../hoc/withLoadingSpinner';

import { ScrollView, View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Button, Caption, Card, Text, Subheading, List } from 'react-native-paper';
import { PageContainer, PageProps } from '../layout/PageContainer';
import { AccountForm } from '../layout/AccountForm';

import styles from '../../styles';
import { useRouteName } from '../../hooks/NavigationHooks';
import { ROUTES } from '../../routes';
import { logoutAction } from '../../state/modules/user';
import { useDispatch } from 'react-redux';
import Subtitle from '../../theme/components/Subtitle';
import LabelledElement from '../layout/LabelledElement';

export const Account = ({ navigation }: PageProps) => {
  const onManageContactsClicked = useRouteName(ROUTES.contacts);
  const dispatch = useDispatch();
  // const loginRoute = usePageRoute(ROUTES.login);
  const [state, setState] = useState({
    firstname: 'Lucas',
    lastname: 'Lopatka',
    contact: '305-499-2121',
    company: 'technologycompany.io',
    profile: 'https://st4.depositphotos.com/1012074/20946/v/600/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg',
    highlights: [
      {
        thumbnail: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/medical-88-113680.png',
        _id: '',
        title: '',
      },
      {
        thumbnail:
          'data:image/jpeg;base64,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',
        _id: '',
        title: '',
      },
      {
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBTzeY1LUZ8fgEhNtmENLs_aBAaieeUerOg&usqp=CAU',
        _id: '',
        title: '',
      },
      {
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsh0qTv_Avv1_MWWygTRZOphc8ttebv-kU5Q&usqp=CAU',
        _id: '',
        title: '',
      },
    ],
  });
  const onSignoutClicked = () => {
    dispatch(logoutAction());
    // loginRoute();
  };

  return (
    <PageContainer>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 15 }}>
        <Avatar.Image source={{ uri: state.profile }} />
        <View style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
          <Subheading>39</Subheading>
          <Caption>Likes</Caption>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
          <Subheading>400</Subheading>
          <Caption>Shares</Caption>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
          <Subheading>527</Subheading>
          <Caption>Shared</Caption>
        </View>
      </View>
      <List.Item
        title={`${state.firstname} ${state.lastname}`}
        description={() => {
          return (
            <View style={{ flexDirection: 'column' }}>
              <Text>{state.company}</Text>
              <Caption>{state.contact}</Caption>
            </View>
          );
        }}
      />
      {/* <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }} > */}
      {
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginLeft: 15 }}>
          {state.highlights.map((highlight) => {
            return <Avatar.Image source={{ uri: highlight.thumbnail }} />;
          })}
        </View>
        //  <View style={{display: 'flex', flexDirection: 'column'}}>

        // </View> */}
        /* <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, padding: 15 }}>
              <Subheading>Personal Information</Subheading>
              <AccountForm navigation={navigation} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
      <View>
        <Button onPress={onManageContactsClicked} dark mode={'outlined'} style={{ marginTop: 10 }}>
          Manage Contacts
        </Button>
        <Button onPress={onSignoutClicked} dark mode={'contained'} style={{ marginTop: 0 }}>
          Sign Out
        </Button>
      </View> */
      }
    </PageContainer>
  );
};

export default withLoadingSpinner(Account);
