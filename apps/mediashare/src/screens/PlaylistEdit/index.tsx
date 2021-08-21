import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Content, View, Button, Icon, Text, Input, Item, Label, Textarea } from 'native-base';

import MediaEdit, { MediaDetailProps, MediaDetailState } from '../MediaDetail';
import { PlaylistCard } from '../../components/layout/PlaylistCard';
import TextField from '../../components/form/TextField';

import styles from './styles';
import { useContext, useState } from 'react';
import { UserContext } from '../../state/user-context';

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

const PlaylistEdit = ({ children, navigation }: { children: any; navigation: any }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const user = useContext(UserContext) as any;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (values: any) => {
    await sleep(300);
  };
  const author = 'Blue Collar Dev';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(user);
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
            {children}
          </PlaylistCard>
        </View>
      </Content>
    </Container>
  );
};

export default reduxForm<{}, PlaylistEditProps>({
  form: 'playlistEdit',
  validate,
})(PlaylistEdit as any);
