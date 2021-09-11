import React, { useState } from 'react';

import * as DocumentPicker from 'expo-document-picker';

import { MediaCard } from '../../layout/MediaCard';
import { Button, Col, Grid, Icon, Input, Item, Label, Text, Textarea, View } from 'native-base';

import { mediaFormConfig } from '../../pages/AddMedia/formConfig';
import { useDispatch } from 'react-redux';
import { addMediaItem } from '../../../state/modules/media-items';
import { useAppSelector } from '../../../state';
import { CreateMediaItemDtoCategoryEnum } from '../../../rxjs-api/models/CreateMediaItemDto';

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
  const [documentName, setDocumentName] = useState('');
  const [documentUri, setDocumentUri] = useState('');

  const media = useAppSelector((state) => state.mediaItem);

  const dispatch = useDispatch();

  async function getDocument() {
    const document = (await DocumentPicker.getDocumentAsync({ type: 'video/mp4' })) as any;
    setDocumentName(document?.name || '');
    setDocumentUri(document?.uri || '');
    try {
      // const fileLink = await FileSystem.getContentUriAsync(document.uri);
      if (true) {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  function submit() {
    const addMediaItemParams = {
      key: documentName,
      title,
      description,
      summary,
      category: CreateMediaItemDtoCategoryEnum.Endurance,
      uri: documentUri,
    };
    dispatch(addMediaItem(addMediaItemParams));
  }

  return (
    <MediaCard>
      <View padder>
        <Item>
          <Grid style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Col style={{ width: 140 }}>
              <Button bordered iconLeft disabled={documentUri.length > 0} onPress={() => getDocument()}>
                <Icon name="cloud-upload-outline" />
                <Text>Upload</Text>
              </Button>
            </Col>
            <Col>
              <Button
                transparent
                disabled={media.loading}
                onPress={() => {
                  setDocumentName('');
                  setDocumentUri('');
                }}
              >
                <Label>{documentName}</Label>
                <Icon name="close-circle-outline" />
              </Button>
            </Col>
          </Grid>
        </Item>

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
      <Button block onPress={() => submit()} disabled={media.loading}>
        <Text>Create</Text>
      </Button>
    </MediaCard>
  );
};

export default MediaDetail;
