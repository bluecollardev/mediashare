import React from 'react';

import { StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { thumbnailRoot, awsUrl } from '../../state/modules/media-items/key-factory';
import { fetchAndPutToS3 } from '../../state/modules/media-items/storage';
import { theme } from '../../styles';
import { Button } from 'react-native-paper';

interface AppUploadProps {
  startLoad: any;
  endLoad: any;
  onUpload: (uri) => any;
  label?: string;
  children?: any;
}

export function AppUpload({ onUpload, label = 'Upload Picture', children }: AppUploadProps) {
  const uploadDocument = async function () {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5, maxWidth: 400, maxHeight: 400 }, function (res) {
      if (!res.assets) {
        return;
      }
      const image = res.assets[0];
      const thumbnailKey = thumbnailRoot + image.fileName;
      fetchAndPutToS3({ key: thumbnailKey, fileUri: image.uri, options: { contentType: image.type } }).then((res: { key: string }) => {
        // eslint-disable-next-line no-shadow
        const image = awsUrl + res.key;
        onUpload(image);
      });
    });
  };

  if (children) {
    return React.cloneElement(React.Children.only(children), {
      onPress: () => uploadDocument(),
    });
  }

  return (
    <Button icon="cloud-upload" mode="contained" dark color={theme.colors.error} onPress={() => uploadDocument()} compact>
      {label}
    </Button>
  );
}

export default AppUpload;
