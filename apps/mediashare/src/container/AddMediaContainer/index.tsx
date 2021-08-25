import { Button, Container, Content, Form, Text, View } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import { routeConfig } from '../../routes';
import styles from '../../screens/Home/styles';
import MediaDetail from '../../screens/MediaDetail';
import { useAppSelector } from '../../state';
import { clearMediaItem } from '../../state/modules/media-items';
import { mediaFormConfig } from './formConfig';

export const AddMediaContainer = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.mediaItem.createState);
  if (state === 'submitting') {
    dispatch(clearMediaItem());
    navigation.navigate(routeConfig.library.name);
  }
  return (
    <Container style={styles.container}>
      <Content>
        <View padder>
          <MediaDetail config={mediaFormConfig} navigation={navigation} />
        </View>
      </Content>
    </Container>
  );
};
