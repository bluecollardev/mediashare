import * as React from 'react';
import { Button, Container, Content, Form, Input, Item, Label, Text, View, Textarea, Grid, Row } from 'native-base';

import { MediaCard } from '../../components/layout/MediaCard';

import styles from './styles';
import { mediaFormConfig } from '../../container/AddMediaContainer/formConfig';
import { useState } from 'react';
import { apis } from '../../state/apis';
import { CreateMediaItemDto } from '../../api';

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

  const onSubmit = (createMediaItemDto: Partial<CreateMediaItemDto>) => {
    console.log(createMediaItemDto);
    // const obs = apis.mediaItems.mediaItemControllerCreate({ createMediaItemDto: createMediaItemDto as any });

    // obs.subscribe((res) => console.log(res));
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation } = props;
  return (
    <Container style={styles.container}>
      <Content>
        <View padder>
          <MediaCard>
            <View padder>
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
