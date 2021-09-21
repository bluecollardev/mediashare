import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import { thumbnailRoot, awsUrl } from '../../state/modules/media-items/key-factory';
import { fetchAndPutToS3 } from '../../state/modules/media-items/storage';
import { theme } from '../../styles';
import { ListActionButton } from './ListActionButton';

interface AppUploadProps {
  startLoad: any;
  endLoad: any;
  onUpload: (uri) => any;
}

function AppUpload({ startLoad, endLoad, onUpload }: AppUploadProps) {
  const uploadDocument = async function () {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5, maxWidth: 400, maxHeight: 400 }, function (res) {
      if (!res.assets) {
        return;
      }
      const image = res.assets[0];
      const thumbnailKey = thumbnailRoot + image.fileName;
      startLoad();
      fetchAndPutToS3({ key: thumbnailKey, fileUri: image.uri, options: { contentType: image.type } }).then((res: { key: string }) => {
        const image = awsUrl + res.key;

        onUpload(image);
        endLoad();
      });
    });
  };
  return <ListActionButton icon={'cloud-upload'} label={'Upload Picture'} actionCb={() => uploadDocument()} />;
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

export default AppUpload;
