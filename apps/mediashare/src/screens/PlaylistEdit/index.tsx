import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Content, View, Button, Icon, Text, Input, Item, Label, Textarea } from 'native-base';

import MediaEdit, { MediaDetailProps, MediaDetailState } from '../MediaDetail';
import { PlaylistCard } from '../../components/layout/PlaylistCard';
import TextField from '../../components/form/TextField';

import styles from './styles';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../state/user-context';
import { apis } from '../../state/apis';
import { routeConfig } from '../../routes';
import { CreatePlaylistDtoCategoryEnum } from '../../rxjs-api';
import { Storage } from 'aws-amplify';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { MediaListItem } from '../../components/layout/MediaListItem';
import { MediaListItemCheckBox } from '../../components/layout/MediaListItemCheckBox';

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

export interface PlaylistEditState extends MediaDetailState {}

const PlaylistEdit = ({ navigation }: { navigation: any }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const user = useContext(UserContext) as any;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (values: { description: string; title: string; mediaIds: any[] }) => {
    const { description, title, mediaIds } = values;

    apis.playlists
      .playlistControllerCreate({ createPlaylistDto: { title, mediaIds, createdBy: '', category: CreatePlaylistDtoCategoryEnum.Rehab } })
      .pipe(take(1))
      .subscribe((res) => {
        routeConfig.playlistDetail;
      });
  };
  const author = 'Blue Collar Dev';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(user);

  async function processAction(items: typeof mediaItems) {
    if (items.length < 1) {
      const res = await Storage.list('');
      setMediaItems(res.map((itm) => ({ ...itm, checked: false })));
    }

    if (items.some((item) => item.checked)) {
      console.log(mediaItems);
      const mediaIds = items.filter((item) => item.checked).map((item) => item.key);
      console.log(mediaIds);

      const results = await handleSubmit({ description, title, mediaIds });
    }
  }

  // useEffect(() => {
  //   getMediaItems();
  // });
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    <Container style={styles.container}>
      <Content>
        <View padder>
          <PlaylistCard
            title={title}
            author={user.user.firstname}
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

          <Button block onPress={() => processAction(mediaItems)}>
            <Text>{mediaItems.length > 0 ? 'Create' : 'Next'}</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default reduxForm<{}, PlaylistEditProps>({
  form: 'playlistEdit',
  validate,
})(PlaylistEdit as any);
