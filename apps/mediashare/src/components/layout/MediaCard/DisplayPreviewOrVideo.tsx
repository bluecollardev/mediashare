import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import Video from 'react-native-video'; // TODO: Not compatible with react-native-web
// import { Video as ExpoVideo } from 'expo-av';
// import Video from 'expo-video-player';
import { usePreviewImage } from 'mediashare/hooks/usePreviewImage';

type MediaDisplayMode = 'image' | 'video';

export interface DisplayPreviewOrVideoProps {
  mediaSrc?: string | null;
  isPlayable?: boolean;
  showThumbnail?: boolean;
  thumbnail?: string;
  style?: any;
}

// TODO: Use MediaPreview component!
export const DisplayPreviewOrVideo: React.FC<DisplayPreviewOrVideoProps> = ({
  mediaSrc,
  isPlayable = false,
  showThumbnail = true,
  thumbnail = null,
  style = {},
}) => {
  const getMediaDisplayMode = () => (showThumbnail && thumbnail ? 'image' : 'video');
  const initialMediaDisplayMode = isPlayable ? (getMediaDisplayMode() as MediaDisplayMode) : 'image';
  const [mediaDisplayMode, setMediaDisplayMode] = useState(initialMediaDisplayMode);

  console.log(`[DisplayPreviewOrVideo] thumbnail: ${thumbnail}`);
  const { imageSrc, isDefaultImage } = usePreviewImage(thumbnail);
  console.log(`imageSrc: ${imageSrc}, isDefaultImage: ${isDefaultImage}`);
  return (
    <View
      style={{
        aspectRatio: 16 / 9,
        width: '100%',
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        ...style,
      }}
    >
      {/* TODO: Use MediaPreview component here! */}
      {mediaDisplayMode === 'image' && !isDefaultImage ? (
        <ImageBackground source={{ uri: imageSrc }} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
          {isPlayable && (
            <TouchableWithoutFeedback onPress={toggleMediaMode}>
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Button icon="play-circle-filled" textColor="rgba(255,255,255,0.666)" labelStyle={{ fontSize: 50 }}>
                  {' '}
                </Button>
              </View>
            </TouchableWithoutFeedback>
          )}
        </ImageBackground>
      ) : mediaDisplayMode === 'video' && mediaSrc ? (
        <>
          {/* TODO: This react-native-video version doesn't work with web and the lib has over a thousand open issues */}
          <Video source={{ uri: mediaSrc }} poster={imageSrc} style={{ width: '100%', height: '100%' }} resizeMode="contain" controls={true} paused={false} />
          {/* Use expo-av + expo-video-player */}
          {/* <Video
          styles={{
            height: 300,
          }}
          videoProps={{
            shouldPlay: false, // Pause by default
            resizeMode: ExpoVideo.RESIZE_MODE_CONTAIN,
            // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
            source: {
              uri: mediaSrc,
            },
          }}
        /> */}
        </>
      ) : null}
    </View>
  );

  function toggleMediaMode() {
    const current = mediaDisplayMode as MediaDisplayMode;
    if (current === 'video') {
      setMediaDisplayMode('image');
    } else if (current === 'image') {
      setMediaDisplayMode('video');
    }
  }
};
