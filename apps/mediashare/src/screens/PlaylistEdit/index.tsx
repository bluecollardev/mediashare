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
import { setDescription, setTitle } from '../../state/modules/create-playlist';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { title, description } = useAppSelector((state) => state.createPlaylist);
  const dispatch = useDispatch();

  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    <PlaylistCard>
      <View padder>
        <Item stackedLabel>
          <Label>Title</Label>

          <Input label="Title" onChange={(e) => dispatch(setTitle(e.nativeEvent.text))} value={title} />
        </Item>
        <Item stackedLabel>
          <Label>Description</Label>
          <Textarea rowSpan={5} style={{ width: '100%' }} bordered onChange={(e) => dispatch(setDescription(e.nativeEvent.text))} value={description} />
        </Item>
      </View>
    </PlaylistCard>
  );
};

export default PlaylistEdit;
