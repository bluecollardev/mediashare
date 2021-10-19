import { ImageBackground, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';

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
  return (
    <View {...rest}>
      <ImageBackground source={{ uri: thumbnail }} resizeMode="cover" style={imageStyle}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height }}>
            {/* @ts-ignore */}
            {showPlayableIcon && <Button icon="play-circle-filled" color="#ffffff" labelStyle={buttonStyle} />}
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
