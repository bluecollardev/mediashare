import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Content, View, Card } from 'native-base';

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

export interface LibraryItemEditProps extends MediaDetailProps {
  navigation: any;
  list: any;
}
export interface LibraryItemEditState extends MediaDetailState {}

class LibraryItemEdit extends MediaEdit<
  LibraryItemEditProps,
  LibraryItemEditState
> {
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSubmit = async (values: any) => {
    await this.sleep(300);
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <AppHeader title="Edit Item" navigation={navigation} />
        <Content>
          <View padder>
            <PlaylistCard />
          </View>
          <View padder>
            <Card>
              <View padder>
                <Field name="title" label="Title" component={TextField} />
                <Field
                  name="description"
                  label="Description"
                  component={TextField}
                />
              </View>
            </Card>
          </View>
        </Content>
      </Container>
    );
  }
}

export default reduxForm<{}, LibraryItemEditProps>({
  form: 'libraryItemEdit',
  validate
})(LibraryItemEdit as any);
