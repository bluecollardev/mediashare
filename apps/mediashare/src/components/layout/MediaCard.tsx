import React, { useEffect, useState } from 'react';

import { Avatar, Button, Card, IconButton, Paragraph, TextInput, Title } from 'react-native-paper';
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
  thumbnail?: string;
  category?: string;
  isEdit?: boolean;
  isReadOnly?: boolean;
  onActionsClicked?: () => void;
  onTitleChange?: (v: string) => void;
  onDescriptionChange?: (v: string) => void;
  onCategoryChange?: (v: string) => void;
  categoryOptions?: any[];
  likes?: number;
  views?: number;
  shares?: number;
}

export const SocialButtons = ({ likes, shares, views }: { likes: number; shares: number; views: number }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
        <Button icon="favorite" mode="text">
          {likes}
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
    thumbnail = null,
    onActionsClicked = () => {},
    children,
    category = 'None',
    isEdit = false,
    isReadOnly = false,
    onTitleChange = (v: string) => {},
    onDescriptionChange = (v: string) => {},
    onCategoryChange = (v: string) => {},
    categoryOptions = [],
    likes = 0,
    views = 0,
    shares = 0,
  } = props;

  return isEdit ? (
    <View>
      {showThumbnail && mediaSrc && (
        <Video paused={true} source={{ uri: mediaSrc }} poster={DEFAULT_IMAGE} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />
      )}
      {showThumbnail && thumbnail && <Card.Cover source={{ uri: thumbnail }} />}
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
        left={(props) => showThumbnail && thumbnail && <Avatar.Image source={{ uri: thumbnail }} size={52} />}
        right={(props: any) => showActions && <IconButton {...props} icon="more-vert" onPress={onActionsClicked} />}
      />
      {!showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 30 }}>
          <Paragraph style={{ marginBottom: 15 }}>{description}</Paragraph>
          {children}
        </Card.Content>
      )}
      {showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 10 }}>
          <Paragraph style={{ marginBottom: 15 }}>{description}</Paragraph>
          {children}
          <View style={{ marginBottom: 0 }}>
            <SocialButtons likes={likes} shares={shares} views={views} />
          </View>
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
