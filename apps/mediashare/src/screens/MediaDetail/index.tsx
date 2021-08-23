import * as React from 'react';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import { MediaCard } from '../../components/layout/MediaCard';
import { Button, Container, Content, Input, Item, Label, Text, View, Textarea, Grid, Row, Col, Icon, Image, Thumbnail } from 'native-base';
import styles from './styles';

import { mediaFormConfig } from '../../container/AddMediaContainer/formConfig';
import { useState } from 'react';
import { CreateMediaItemDto } from '../../api';
import { useDispatch } from 'react-redux';
import { uploadMediaToS3 } from '../../state/modules/media-items';

export interface MediaDetailProps {
  navigation: any;
  list: any;
}

export interface MediaDetailState {}

const MediaDetail = (props: { config: typeof mediaFormConfig } & { navigation }) => {
  const {
    config: { summary: summaryCfg, description: descriptionCfg, title: titleCfg },
  } = props;
  const [summary, setSummary] = useState(summaryCfg.value);
  const [description, setDescription] = useState(descriptionCfg.value);
  const [title, setTitle] = useState(titleCfg.value);
  const [imageSrc, setImageSrc] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (createMediaItemDto: Partial<CreateMediaItemDto>) => {
    console.log(createMediaItemDto);
  };

  async function getDocument() {
    console.log('started');
    const document = (await DocumentPicker.getDocumentAsync({ type: 'video/mp4' })) as any;

    console.log('🚀 -----------------------------------------------------------------');
    console.log('🚀 ~ file: index.tsx ~ line 34 ~ getDocument ~ document', document);
    console.log('🚀 -----------------------------------------------------------------');
    try {
      const fileLink = await FileSystem.getContentUriAsync(document.uri);
      const file = await fetch(document.uri);
      const blob = await file.blob();

      // const blob = await FileSystem.readAsStringAsync(document.uri, { encoding: FileSystem.EncodingType.Base64 });
      dispatch(uploadMediaToS3({ blob, key: document.name }));
      console.log('🚀 ---------------------------------------------------------');
      console.log('🚀 ~ file: index.tsx ~ line 42 ~ getDocument ~ blob', file);
      console.log('🚀 ---------------------------------------------------------');
    } catch (err) {
      console.log(err);
    }
    setImageSrc(document.uri);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation } = props;

  return (
    <Container style={styles.container}>
      <Content>
        <View padder>
          <MediaCard>
            <View padder>
              <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Col>
                  <Item>
                    <Button bordered iconLeft onPress={() => getDocument()}>
                      <Icon name="cloud-upload-outline" />
                      <Text>Upload</Text>
                    </Button>
                    <Thumbnail source={{ uri: imageSrc }} />
                  </Item>
                </Col>
                {/* <Col>
                  <Image source={{ uri: imageSrc }} />
                </Col> */}
              </Grid>
              <Item stackedLabel>
                <Label>{titleCfg.label}</Label>

                <Input value={title} onChange={(e) => setTitle(e.nativeEvent.text)} />
              </Item>

              <Item stackedLabel>
                <Label>{descriptionCfg.label}</Label>

                <Textarea rowSpan={3} style={{ width: '100%' }} bordered onChange={(e) => setDescription(e.nativeEvent.text)} value={description} />
              </Item>

              <Item stackedLabel style={{ paddingBottom: 10 }}>
                <Label>{summaryCfg.label}</Label>

                <Textarea bordered rowSpan={3} style={{ width: '100%' }} value={summary} onChange={(e) => setSummary(e.nativeEvent.text)} />
              </Item>
            </View>
          </MediaCard>
          <Button block onPress={() => onSubmit({ summary, description, title })}>
            <Text>Create</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default MediaDetail;
