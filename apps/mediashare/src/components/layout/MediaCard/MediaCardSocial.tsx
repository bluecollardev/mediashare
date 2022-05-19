import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { theme } from 'mediashare/styles';

export interface MediaCardSocialProps {
  likes: number;
  shares: number;
  views: number;
}

export const MediaCardSocial: React.FC<MediaCardSocialProps> = ({ likes = 0, views = 0, shares = 0 }: MediaCardSocialProps) => {
  return (
    <View style={{ marginBottom: 0 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ marginRight: 2 }}>
          <Button icon="visibility" mode="text">
            <Text style={defaultStyles.buttonText}>{views}</Text>
          </Button>
        </View>
        <View style={{ marginRight: 2 }}>
          <Button icon="share" mode="text">
            <Text style={defaultStyles.buttonText}>{shares}</Text>
          </Button>
        </View>
        <View>
          <Button icon="favorite" mode="text">
            <Text style={defaultStyles.buttonText}>{likes}</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  buttonText: {
    color: theme.colors.textDarker,
    fontFamily: theme.fonts.thin.fontFamily,
    fontSize: 13,
    marginBottom: 2,
    marginLeft: 2,
  },
});
