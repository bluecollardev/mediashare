import React from 'react';

import { Button, Card, Chip, IconButton, Paragraph, TextInput, Title } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import SwitchSelector from 'react-native-switch-selector';
import { categoryValidator, descriptionValidator, titleValidator } from './formConfig';
import { theme } from '../../styles';

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
  onActionsClicked?: () => void;
  onTitleChange?: (v: string) => void;
  onDescriptionChange?: (v: string) => void;
  onCategoryChange?: (v: string) => void;
  categoryOptions?: any[];
}

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
    showThumbnail = false,
    onActionsClicked = () => {},
    children,
    category = 'None',
    isEdit = false,
    onTitleChange = (v: string) => {},
    onDescriptionChange = (v: string) => {},
    onCategoryChange = (v: string) => {},
    categoryOptions = [],
  } = props;

  return (
    <Card style={styles.card} mode="elevated">
      {isEdit ? (
        <>
          {showThumbnail && mediaSrc && (
            <Video source={{ uri: mediaSrc }} poster={DEFAULT_IMAGE} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />
          )}
          <Card.Content>{children}</Card.Content>
          <Card.Content style={{ marginTop: 20, marginBottom: 20 }}>
            <TextInput
              dense
              mode={'outlined'}
              textAlign={'left'}
              label={'Title'}
              value={title}
              error={titleValidator(title)}
              onChangeText={(text) => onTitleChange(text)}
            />
            <SwitchSelector
              style={{ marginTop: 20, marginBottom: 20 }}
              options={categoryOptions.map((option) => ({ value: option, label: option }))}
              initial={categoryOptions.findIndex((option) => option.toLowerCase() === category.toLowerCase())}
              onPress={(value) => onCategoryChange(value as string)}
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
            />
          </Card.Content>
        </>
      ) : (
        <>
          {showThumbnail && mediaSrc && (
            <Video source={{ uri: mediaSrc }} poster={DEFAULT_IMAGE} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />
          )}
          <Card.Title
            title={<Title>{title}</Title>}
            subtitle={`Tags: ${category ?? 'None'}`}
            right={(props: any) => showActions && <IconButton {...props} icon="more-vert" onPress={onActionsClicked} />}
          />
          <Card.Content>
            {children}
            <Paragraph style={{ marginTop: 2, marginBottom: 5 }}>{description}</Paragraph>
            {showSocial === true && (
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 15 }}>
                <View style={{ marginRight: 3 }}>
                  <Button icon="thumb-up" mode="text">
                    12
                  </Button>
                </View>
                <View style={{ marginRight: 3 }}>
                  <Button icon="comment" mode="text">
                    0
                  </Button>
                </View>
                <View style={{}}>
                  <Button icon="share" mode="text">
                    3
                  </Button>
                </View>
              </View>
            )}
          </Card.Content>
        </>
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
