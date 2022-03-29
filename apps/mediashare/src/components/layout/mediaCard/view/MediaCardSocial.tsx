import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export interface MediaCardSocialProps {
  likes: number;
  shares: number;
  views: number;
}

export const MediaCardSocial: React.FC<MediaCardSocialProps> = ({ likes = 0, views = 0, shares = 0 }: MediaCardSocialProps) => {
  return (
    <View style={{ marginBottom: 0 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ marginRight: 3 }}>
          <Button icon="visibility" mode="text">
            {views}
          </Button>
        </View>
        <View style={{ marginRight: 3 }}>
          <Button icon="share" mode="text">
            {shares}
          </Button>
        </View>
        <View>
          <Button icon="favorite" mode="text">
            {likes}
          </Button>
        </View>
      </View>
    </View>
  );
};
