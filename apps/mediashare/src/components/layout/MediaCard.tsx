import React, { useEffect, useState } from 'react';

import { Avatar, Button, Card, IconButton, Paragraph, TextInput, Title, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import Video from 'react-native-video';
import SwitchSelector from 'react-native-switch-selector';
import { descriptionValidator, titleValidator } from './formConfig';

export const DEFAULT_IMAGE = 'https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg';
export const DEFAULT_AVATAR = 'https://i.pinimg.com/originals/db/fa/08/dbfa0875b8925919a3f16d53d9989738.png';

import { UserDto } from '../../rxjs-api';
import { useAppSelector } from '../../state';
import { findInArray, getAuthorText } from '../../utils';
import { theme } from '../../styles';

export interface MediaCardProps {
  id?: string;
  title?: string;
  author?: string | string[];
  description?: string;
  showSocial?: any | boolean;
  showActions?: boolean;
  showThumbnail?: boolean;
  thumbnail?: string;
  mediaSrc?: string | null;
  category?: string;
  children?: any;
  topDrawer?: React.FC<any>;
  isEdit?: boolean;
  isPlayable?: boolean;
  isReadOnly?: boolean;
  onActionsClicked?: () => void;
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
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

type MediaDisplayMode = 'preview' | 'video';

export const MediaCard: React.FC<MediaCardProps> = ({
  title = '',
  author = 'Anonymous',
  description = '',
  mediaSrc,
  showSocial = false,
  showActions = false,
  showThumbnail = true,
  thumbnail = null,
  onActionsClicked = () => {},
  children,
  topDrawer = undefined,
  category = 'None',
  isEdit = false,
  isPlayable = false,
  isReadOnly = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTitleChange = (value: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDescriptionChange = (value: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCategoryChange = (value: string) => {},
  categoryOptions = [],
  likes = 0,
  views = 0,
  shares = 0,
}: MediaCardProps) => {
  const getMediaDisplayMode = () => (showThumbnail && thumbnail ? 'preview' : 'video');
  const [mediaDisplayMode, setMediaDisplayMode] = useState(getMediaDisplayMode() as MediaDisplayMode);

  const users = useAppSelector((state) => state.users?.entities);
  const [creator, setCreator] = useState({} as UserDto);
  useEffect(() => {
    const primaryAuthor = Array.isArray(author) ? author[0] : author;
    const user = findInArray(users, 'username', primaryAuthor);
    setCreator(user);
  }, [users]);

  const DisplayPreviewOrVideo = () => {
    return mediaDisplayMode === 'preview' ? (
      <ImageBackground source={{ uri: thumbnail }} resizeMode="cover" style={{ width: '100%', height: 300 }}>
        {isPlayable && (
          <TouchableWithoutFeedback onPress={toggleMediaMode}>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Button icon="play-circle-filled" color="#ffffff" labelStyle={{ fontSize: 50 }}>
                {' '}
              </Button>
            </View>
          </TouchableWithoutFeedback>
        )}
      </ImageBackground>
    ) : mediaDisplayMode === 'video' && mediaSrc ? (
      <Video
        source={{ uri: mediaSrc }}
        poster={thumbnail || DEFAULT_IMAGE}
        style={{ width: '100%', height: 300, margin: 3, marginBottom: 6 }}
        resizeMode="contain"
        controls={true}
      />
    ) : null;
  };

  const TopDrawer = topDrawer;

  return isEdit ? (
    <View>
      <DisplayPreviewOrVideo />
      {topDrawer && <TopDrawer />}
      <View style={{ paddingTop: 20, paddingBottom: 40 }}>
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
        <Card style={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'lightgrey', marginTop: 15, marginBottom: 15 }}>
          <Card.Content>
            <Text style={{ color: 'darkgrey', fontWeight: 'bold', fontSize: 12 }}>Select Content Type</Text>
            <SwitchSelector
              fontSize={13}
              textColor={theme.colors.text}
              selectedColor={'#ffffff'}
              backgroundColor={'#ffffff'}
              buttonColor={theme.colors.accentDarker}
              style={{ marginTop: 0, padding: 10 }}
              options={categoryOptions.map((option) => ({ value: option, label: option }))}
              initial={categoryOptions.findIndex((option) => option.toLowerCase() === category.toLowerCase())}
              onPress={(value) => onCategoryChange(value as string)}
              disabled={isReadOnly}
            />
          </Card.Content>
        </Card>
        <View style={{ marginTop: 5, marginBottom: 40 }}>{children}</View>
      </View>
    </View>
  ) : (
    <Card style={styles.card} mode="elevated">
      <DisplayPreviewOrVideo />
      {/* Had to use actual text spaces to space this out for some reason not going to look into it now... */}
      <Card.Title
        title={<Title>{`  ${title}`}</Title>}
        subtitle={`   By ${creator ? getAuthorText(creator) : 'Anonymous'}`}
        left={() =>
          showThumbnail &&
          thumbnail && (
            <>
              <Avatar.Image source={{ uri: creator?.imageSrc || DEFAULT_AVATAR }} size={52} />
            </>
          )
        }
        right={(buttonProps: any) => showActions && <IconButton {...buttonProps} icon="more-vert" onPress={onActionsClicked} />}
      />
      {!showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 30 }}>
          <Paragraph style={{ marginBottom: 15 }}>{description}</Paragraph>
          {showThumbnail && thumbnail && <Card.Cover source={{ uri: thumbnail }} />}
          {children}
        </Card.Content>
      )}
      {showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 10 }}>
          <Paragraph style={{ marginTop: 15, marginBottom: 30 }}>{description}</Paragraph>
          {children}
          <View style={{ marginBottom: 0 }}>
            <SocialButtons likes={likes} shares={shares} views={views} />
          </View>
        </Card.Content>
      )}
    </Card>
  );

  function toggleMediaMode() {
    const current = mediaDisplayMode as MediaDisplayMode;
    if (current === 'video') {
      setMediaDisplayMode('preview');
    } else if (current === 'preview') {
      setMediaDisplayMode('video');
    }
  }
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
