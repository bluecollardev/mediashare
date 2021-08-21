import { Form } from 'native-base';
import React from 'react';
import MediaDetail from '../../screens/MediaDetail';
import { mediaFormConfig } from './formConfig';

export const AddMediaContainer = ({ navigation }: { navigation: any }) => {
  return <MediaDetail config={mediaFormConfig} navigation={navigation} />;
};
