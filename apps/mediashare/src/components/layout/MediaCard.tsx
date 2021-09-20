import React, { useEffect, useState } from 'react';

import { Button, Card, IconButton, Paragraph, TextInput, Title } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import SwitchSelector from 'react-native-switch-selector';
import { descriptionValidator, titleValidator } from './formConfig';

export interface MediaListItemProps {
  mediaSrc?: string | null;
  title?: string;
  author?: string;
  description?: string;
  showSocial?: any | boolean;
  buttons?: any | boolean;
  content?: any;
  showActions?: boolean;
  showThumbnail?: boolean;
  category?: string;
  isEdit?: boolean;
  isReadOnly?: boolean;
  onActionsClicked?: () => void;
  onTitleChange?: (v: string) => void;
  onDescriptionChange?: (v: string) => void;
  onCategoryChange?: (v: string) => void;
  categoryOptions?: any[];
}

export const SocialButtons = () => {
  const [views, setViews] = useState(0);
  const [shares, setShares] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    const getRand = () => Math.floor(Math.random() * 10);
    setViews(getRand());
    setShares(getRand());
    setComments(0);
  }, []);

  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 15 }}>
      <View style={{ marginRight: 3 }}>
        <Button icon="visibility" mode="text">
          {views}
        </Button>
      </View>
      <View style={{ marginRight: 3 }}>
        <Button icon="share" mode="text">
          {shares}
        </Button>
      </View>
      <View style={{}}>
        <Button icon="comment" mode="text">
          {comments}
        </Button>
      </View>
    </View>
  );
};

export const MediaCard: React.FC<MediaListItemProps> = (props) => {
  const DEFAULT_IMAGE = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';

  const {
    title = '',
    author = '',
    description = '',
    mediaSrc,
    showSocial = false,
    buttons = false,
    showActions = false,
    showThumbnail = true,
    onActionsClicked = () => {},
    children,
    category = 'None',
    isEdit = false,
    isReadOnly = false,
    onTitleChange = (v: string) => {},
    onDescriptionChange = (v: string) => {},
    onCategoryChange = (v: string) => {},
    categoryOptions = [],
  } = props;

  return isEdit ? (
    <View>
      {showThumbnail && mediaSrc && (
        <Video paused={true} source={{ uri: mediaSrc }} poster={DEFAULT_IMAGE} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />
      )}
      <View style={{ paddingTop: 20, paddingBottom: 40 }}>
        <SwitchSelector
          style={{ marginTop: 0, padding: 10 }}
          options={categoryOptions.map((option) => ({ value: option, label: option }))}
          initial={categoryOptions.findIndex((option) => option.toLowerCase() === category.toLowerCase())}
          onPress={(value) => onCategoryChange(value as string)}
          disabled={isReadOnly}
        />
        <TextInput
          dense
          mode={'outlined'}
          textAlign={'left'}
          label={'Title'}
          value={title}
          error={titleValidator(title)}
          onChangeText={(text) => onTitleChange(text)}
          disabled={isReadOnly}
          style={{ marginBottom: 10 }}
        />
        <TextInput
          multiline={true}
          mode={'outlined'}
          textAlign={'left'}
          label={'Description'}
          value={description}
          numberOfLines={5}
          error={descriptionValidator(description)}
          onChangeText={(text) => onDescriptionChange(text)}
          disabled={isReadOnly}
        />
        <View style={{ marginTop: 5, marginBottom: 40 }}>{children}</View>
      </View>
    </View>
  ) : (
    <Card style={styles.card} mode="elevated">
      {showThumbnail && mediaSrc && (
        <Video paused={true} source={{ uri: mediaSrc }} poster={DEFAULT_IMAGE} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />
      )}
      <Card.Title
        title={<Title>{title}</Title>}
        // subtitle={`Tags: ${category ?? 'None'}`}
        right={(props: any) => showActions && <IconButton {...props} icon="more-vert" onPress={onActionsClicked} />}
      />
      {!showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 40 }}>
          {children}
          <Paragraph style={{ marginTop: 2, marginBottom: 5 }}>{description}</Paragraph>
        </Card.Content>
      )}
      {showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 10 }}>
          {children}
          <Paragraph style={{ marginTop: 2, marginBottom: 5 }}>{description}</Paragraph>
          <SocialButtons />
        </Card.Content>
      )}
    </Card>
  );
};
const styles = StyleSheet.create({
  input: {},
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  card: {
    margin: 0,
  },
});
