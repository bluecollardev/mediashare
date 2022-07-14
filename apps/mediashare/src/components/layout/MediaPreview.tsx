import React from 'react';
import { ImageBackground, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-paper';
import { usePreviewImage } from 'mediashare/hooks/usePreviewImage';

export interface MediaPreviewProps {
  thumbnail?: string;
  showPlayableIcon?: boolean;
  imageStyle?: any;
  buttonStyle?: any;
  width?: string | number;
  height?: string | number;
  onPress?: () => void;
}

export const MediaPreview = ({
  thumbnail,
  onPress = () => {},
  imageStyle = styles.defaultImageStyle,
  buttonStyle = styles.defaultButtonStyle,
  showPlayableIcon = true,
  width = '100%',
  height = 100,
  ...rest
}: MediaPreviewProps & any) => {
  const { imageSrc, isDefaultImage } = usePreviewImage(thumbnail);
  return (
    <View {...rest}>
      <ImageBackground source={{ uri: imageSrc }} resizeMode={isDefaultImage ? 'contain' : 'cover'} style={imageStyle}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height }}>
            {/* @ts-ignore */}
            {showPlayableIcon && !isDefaultImage && <Button icon="play-circle-filled" textColor="rgba(255,255,255,0.666)" labelStyle={buttonStyle} />}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

const styles = {
  defaultImageStyle: { marginRight: 10 },
  defaultButtonStyle: { fontSize: 32, marginLeft: 0, paddingLeft: 0, paddingRight: 0 },
};
