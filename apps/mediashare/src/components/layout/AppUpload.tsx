import React from 'react';
import { useDispatch } from 'react-redux';
import Config from '../../config';

import { thumbnailRoot, awsUrl } from '../../store/modules/media-items/key-factory';
import { fetchAndPutToS3 } from '../../store/modules/media-items/storage';
import { createThumbnail } from '../../store/modules/media-items';
import { setError } from '../../store/modules/app-state';

import * as DocumentPicker from 'expo-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';

import { theme } from '../../styles';

interface AppUploadProps {
  onUploadStart?: () => any;
  onUploadComplete?: (uri) => any;
  uploadMode: 'video' | 'photo';
  label?: string;
  children?: any;
}

const maxUpload = parseInt(Config.MAX_UPLOAD, 10) || 104857600;

export function AppUpload({
  uploadMode = 'photo',
  onUploadStart = () => undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUploadComplete = (uri) => undefined,
  label = 'Upload Picture',
  children,
}: AppUploadProps) {
  const dispatch = useDispatch();
  label = label || (uploadMode === 'video' ? 'Upload Video' : uploadMode === 'photo' ? 'Upload Photo' : 'Upload File');

  if (children) {
    return React.cloneElement(React.Children.only(children), {
      onPress: uploadMode === 'video' ? () => uploadVideo() : () => uploadPhoto(),
    });
  }

  return (
    <Button
      icon="cloud-upload"
      mode="contained"
      dark
      color={theme.colors.error}
      onPress={uploadMode === 'video' ? () => uploadVideo() : () => uploadPhoto()}
      compact
    >
      {label}
    </Button>
  );

  async function uploadVideo() {
    // TODO: Only MP4 supported right now?
    const video = (await DocumentPicker.getDocumentAsync({ type: 'video/mp4' })) as any;
    // TODO: Ideally we don't have to check for the video type cancel here, improve whatever logic is setting the value!
    if (!video || video.type === 'cancel') {
      return;
    }
    if (!video || video.size > maxUpload) {
      dispatch(setError({ name: 'File too big', message: `Files must be under ${maxUpload / 1024 / 1024} Mb` }));
      return;
    }

    console.log('Upload video');
    onUploadStart();

    console.log('Video upload response');
    console.log(video);
    try {
      console.log('Dispatching createThumbnail action');
      console.log(JSON.stringify({ key: video.name, fileUri: video.uri }, null, 2));
      await dispatch(createThumbnail({ key: video.name, fileUri: video.uri }));
    } catch (err) {
      console.log('Dispatching createThumbnail action failed');
      onUploadComplete('');
      console.log(err);
    }

    handleUploadComplete(video);
    // setDocumentUri(document.uri || '');
  }

  async function uploadPhoto() {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5, maxWidth: 400, maxHeight: 400 }, function (res) {
      console.log('Upload photo');
      onUploadStart();

      if (!res.assets) {
        return;
      }
      const image = res.assets[0];
      const thumbnailKey = thumbnailRoot + image.fileName;
      fetchAndPutToS3({ key: thumbnailKey, fileUri: image.uri, options: { contentType: image.type } }).then((res: { key: string }) => {
        // eslint-disable-next-line no-shadow
        const image = awsUrl + res.key;
        handleUploadComplete(image);
      });
    });
  }

  async function handleUploadComplete(mediaUri) {
    onUploadComplete(mediaUri);
  }
}

export default AppUpload;
