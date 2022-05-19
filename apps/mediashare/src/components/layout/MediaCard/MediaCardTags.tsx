import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
// import { Tag } from 'mediashare/rxjs-api';

export interface MediaCardTagsProps {
  tags?: any[]; // TODO: This should be a Tag[] but for some reason _id is missing from the Tag model... fix in the API
}

export const MediaCardTags: React.FC<MediaCardTagsProps> = ({ tags = [] as any[] }: MediaCardTagsProps) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {Array.isArray(tags) &&
        tags.length > 0 &&
        tags.map((tag, idx) => {
          return (
            <View key={`${tag?._id}_${idx}`} style={{ flex: 0, marginLeft: 3, marginRight: 3, marginBottom: 10 }}>
              <Chip textStyle={{ fontSize: 15 }}>{tag?.value || 'Unknown'}</Chip>
            </View>
          );
        })}
    </View>
  );
};
