import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Content, View, Button, Icon, Text, Input, Item, Label, Textarea } from 'native-base';

import { useAppSelector } from '../../state';

import { useDispatch } from 'react-redux';
import { setDescription, setTitle } from '../../state/modules/create-playlist';
import { MediaCard } from '../../components/layout/MediaCard';
import { CreatePlaylistDtoCategoryEnum } from '../../rxjs-api/models/CreatePlaylistDto';

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
  const options = [];
  for (const value in CreatePlaylistDtoCategoryEnum) {
    options.push(value);
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    <MediaCard categoryOptions={options}>
      <View padder />
    </MediaCard>
  );
};

export default PlaylistEdit;
