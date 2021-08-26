import * as React from 'react';
import { View, Text, List } from 'native-base';

import { MediaListItem } from '../../components/layout/MediaListItem';
import { PlaylistItemResponseDto } from '../../rxjs-api';
import { PlaylistResponseDto } from '../../api/models/playlist-response-dto';

export interface PlaylistsProps {
  list: PlaylistResponseDto[];
  onViewDetailClicked: Function;
}

export function mapPlaylists(playlist: PlaylistResponseDto[]) {
  const list = playlist.map((item) => {
    const keyed = {
      id: item._id,
      title: item.title,
      description: `${item?.mediaItems?.length || 0} Videos`,
      key: item._id,
      ...item,
    };
    return keyed;
  });
  return list;
}

export interface PlaylistsState {}

const Playlists = ({ onViewDetailClicked, list }: PlaylistsProps) => {
  if (!list) {
    return <Text>...loading</Text>;
  }

  return (
    <View>
      <List>
        {list.map((item, idx) => {
          const { title, description } = item;
          return (
            <MediaListItem
              key={item._id}
              title={title}
              description={description}
              onViewDetail={() => {
                onViewDetailClicked(item);
              }}
            />
          );
        })}
      </List>
    </View>
  );
};

export default Playlists;
