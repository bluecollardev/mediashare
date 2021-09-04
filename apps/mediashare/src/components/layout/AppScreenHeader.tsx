import React from 'react';
import { AppHeader } from './AppHeader';

export interface AppScreenHeaderProps {
  title: string;
  navigation: any;
  showBack?: boolean;
  showSearch?: boolean;
  showSort?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppScreenHeader = (props) => {
  const { scene, previous, navigation } = props;
  const { options } = scene.descriptor;
  const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.name;

  return (
    <AppHeader
      title={title}
      navigation={navigation}
      showBack={previous}
      // showSearch={true}
      showSort={true}
    />
  );
};
