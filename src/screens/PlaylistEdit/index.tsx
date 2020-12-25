import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Content,
  View,
  Card,
  Button,
  Icon,
  Text,
} from 'native-base';

import styles from './styles';
import { AppHeader } from '../../components/layout/AppHeader';
import { PlaylistCard } from '../../components/layout/PlaylistCard';

import MediaEdit, { MediaDetailProps, MediaDetailState } from '../MediaDetail';
import TextField from '../../components/form/TextField';

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

class PlaylistEdit extends MediaEdit<PlaylistEditProps, PlaylistEditState> {
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSubmit = async (values: any) => {
    await this.sleep(300);
  };

  render() {
    const { navigation } = this.props;
    const title = 'My First Playlist';
    const author = 'Blue Collar Dev';
    const description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
      'eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    return (
      <Container style={styles.container}>
        <AppHeader
          title="Edit Playlist"
          navigation={navigation}
          showBack={true}
        />
        <Content>
          <View padder>
            <PlaylistCard
              title={title}
              author={author}
              // description={description}
            >
              <View padder>
                <Field name="title" label="Title" component={TextField} />
                <Field
                  name="description"
                  label="Description"
                  component={TextField}
                />
              </View>
              <View padder style={{ flexDirection: 'row' }}>
                <Button
                  iconLeft
                  bordered
                  success
                  style={{ flex: 1, marginRight: 10, justifyContent: 'center' }}>
                  <Icon name="checkmark" />
                  <Text style={{ paddingRight: 30 }}>Save</Text>
                </Button>
                <Button iconLeft bordered danger style={{ flex: 0 }}>
                  <Icon name="close-outline" />
                  <Text style={{ paddingRight: 0 }} />
                </Button>
              </View>
            </PlaylistCard>
          </View>
        </Content>
      </Container>
    );
  }
}

export default reduxForm<{}, PlaylistEditProps>({
  form: 'playlistEdit',
  validate
})(PlaylistEdit as any);
