import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Content, View, Button, Icon, Text, Input, Item, Label, Textarea } from 'native-base';

import { PlaylistCard } from '../../components/layout/PlaylistCard';

import styles from './styles';
import { useState } from 'react';

import { routeConfig } from '../../routes';
import { CreatePlaylistDtoCategoryEnum } from '../../rxjs-api';
import { Storage } from 'aws-amplify';

import { MediaListItemCheckBox } from '../../components/layout/MediaListItemCheckBox';
import { useAppSelector } from '../../state';
import { addUserPlaylist, clearPlaylistAction, findUserPlaylists } from '../../state/modules/playlists/index';
import { useDispatch } from 'react-redux';

const validate = (values) => {
  const error = {} as any;
  error.email = '';
  error.name = '';
  let ema = values.email;
  let nm = values.name;
  if (values.email === undefined) {
    ema = '';
  }
  if (values.name === undefined) {
    nm = '';
  }
  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (nm.length > 8) {
    error.name = 'max 8 characters';
  }
  return error;
};

export interface PlaylistEditProps extends MediaDetailProps {
  navigation: any;
  list: any;
}

const PlaylistEdit = ({ navigation }: { navigation: any }) => {
  const playlist = useAppSelector((app) => app.playlist);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const author = user.firstName;

  async function processAction(items: typeof mediaItems) {
    if (items.length < 1) {
      const res = await Storage.list('');
      setMediaItems(res.map((itm) => ({ ...itm, checked: false })));
    }

    if (items.some((item) => item.checked) && !playlist.loading) {
      const mediaIds = items.filter((item) => item.checked).map((item) => item.key);

      // const results = await handleSubmit({ description, title, mediaIds });
      dispatch(addUserPlaylist({ description, title, mediaIds, createdBy: user._id, category: CreatePlaylistDtoCategoryEnum.Builder }));
    }
  }
  if (!playlist.loading && playlist.createdPlaylist) {
    console.log('playlist created', playlist.createdPlaylist);
    dispatch(findUserPlaylists({}));
    dispatch(clearPlaylistAction());
    navigation.navigate(routeConfig.playlists);
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    <Container style={styles.container}>
      <Content>
        <View padder>
          <PlaylistCard
            title={title}
            author={author}
            // description={description}
          >
            {mediaItems.length < 1 ? (
              <View padder>
                <Item stackedLabel>
                  <Label>Title</Label>

                  <Input label="Title" onChange={(e) => setTitle(e.nativeEvent.text)} value={title} />
                </Item>
                <Item stackedLabel>
                  <Label>Description</Label>
                  <Textarea rowSpan={5} style={{ width: '100%' }} bordered onChange={(e) => setDescription(e.nativeEvent.text)} value={description} />
                </Item>
              </View>
            ) : (
              mediaItems.map((item) => (
                <MediaListItemCheckBox
                  key={`item-${item.key}`}
                  title={item.key}
                  description={''}
                  checked={item.checked}
                  // image={image}
                  changeChecked={(bool) => (item.checked = bool)}
                  onViewDetail={() => {
                    navigation.navigate(routeConfig.libraryItemDetail.name);
                  }}
                />
              ))
            )}
          </PlaylistCard>

          <Button block onPress={() => processAction(mediaItems)} disabled={playlist.loading}>
            <Text>{mediaItems.length > 0 ? 'Create' : 'Next'}</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default PlaylistEdit;
