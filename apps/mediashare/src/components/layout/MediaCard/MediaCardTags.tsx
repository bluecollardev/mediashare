import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

import { mapAvailableTags, getMappedTagUsingKey } from 'mediashare/store/modules/tags/utils';

import { Tag } from 'mediashare/rxjs-api';

export interface MediaCardTagsProps {
  availableTags?: Tag[];
  tags?: string[];
}

export const MediaCardTags: React.FC<MediaCardTagsProps> = ({
  availableTags = [] as Tag[],
  tags = [],
}: MediaCardTagsProps) => {
  const mappedMediaTags = useMemo(() => mapAvailableTags(availableTags).filter((tag) => tag.isMediaTag), []);
  const mappedPlaylistTags = useMemo(() => mapAvailableTags(availableTags).filter((tag) => tag.isPlaylistTag), []);

  return (
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {Array.isArray(tags) && tags.length > 0 && tags.map((selectedTagKey, idx) => {
        const mappedTag = getMappedTagUsingKey(mappedMediaTags, selectedTagKey);
        return (
          <View key={`${selectedTagKey}_${idx}`} style={{ flex: 0, marginLeft: 3, marginRight: 3 }}>
            <Chip>{mappedTag?.name || 'Unknown'}</Chip>
          </View>
        );
      })}
    </View>
  );
};
