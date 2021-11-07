import React from 'react';
import { ImageBackground, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-paper';
import { usePreviewImage } from '../../hooks/UsePreviewImage';

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
  const DEFAULT_IMAGE = usePreviewImage();
  const imageSrc = thumbnail || DEFAULT_IMAGE;
  const isDefaultImage = imageSrc === DEFAULT_IMAGE;
  if (imageSrc === '') {
    console.warn('image src is an empty string');
  }
  return (
    <View {...rest}>
      <ImageBackground source={{ uri: imageSrc }} resizeMode="cover" style={imageStyle}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height }}>
            {/* @ts-ignore */}
            {showPlayableIcon && !isDefaultImage && <Button icon="play-circle-filled" color="#ffffff" labelStyle={buttonStyle} />}
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
