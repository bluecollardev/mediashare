import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Content, View, Button, Icon, Text } from 'native-base';

import MediaEdit from '../MediaDetail';
import { LibraryItemCard } from '../../components/layout/LibraryItemCard';
import TextField from '../../components/form/TextField';

import styles from './styles';

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

class LibraryItemEdit extends React.Component {
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSubmit = async (values: any) => {
    await this.sleep(300);
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { navigation } = this.props;
    const title = 'My Video #1';
    const author = 'Blue Collar Dev';
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' + 'eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const image = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

    return (
      <Container style={styles.container}>
        <Content>
          <View padder>
            <LibraryItemCard title={title} author={author} description={description} image={image}>
              <View padder>
                <Field name="title" label="Title" component={TextField} />
                <Field name="description" label="Description" component={TextField} />
              </View>
              <View padder style={{ flexDirection: 'row' }}>
                <Button
                  iconLeft
                  bordered
                  danger
                  style={{
                    flex: 1,
                    marginRight: 10,
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="close-outline" />
                  <Text style={{ paddingRight: 30 }}>Cancel</Text>
                </Button>
                <Button
                  iconLeft
                  bordered
                  success
                  style={{
                    flex: 1,
                    marginRight: 10,
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="checkmark" />
                  <Text style={{ paddingRight: 30 }}>Save</Text>
                </Button>
              </View>
            </LibraryItemCard>
          </View>
        </Content>
      </Container>
    );
  }
}

export default reduxForm<{}, LibraryItemEditProps>({
  form: 'libraryItemEdit',
  validate,
})(LibraryItemEdit as any);
