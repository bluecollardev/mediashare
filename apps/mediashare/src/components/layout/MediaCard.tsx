import React, { useEffect, useState } from 'react';

import { Avatar, Button, Card, IconButton, Paragraph, Title, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native';

// import Video from 'react-native-video'; // TODO: Not compatible with react-native-web
import { Video as ExpoVideo } from 'expo-av';
import Video from 'expo-video-player';

import SwitchSelector from 'react-native-switch-selector';
import { descriptionValidator, titleValidator } from './formConfig';
import { TextField } from '../form/TextField';
export const DEFAULT_AVATAR = 'https://i.pinimg.com/originals/db/fa/08/dbfa0875b8925919a3f16d53d9989738.png';

import { UserDto } from '../../rxjs-api';
import { useAppSelector } from '../../store';
import { findInArray, getAuthorText, getUsername } from '../../utils';
import { usePreviewImage } from '../../hooks/usePreviewImage';
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
  elevation?: number;
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

type MediaDisplayMode = 'image' | 'video';

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
  elevation = 0,
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
  const getMediaDisplayMode = () => (showThumbnail && thumbnail ? 'image' : 'video');
  const initialMediaDisplayMode = isPlayable ? (getMediaDisplayMode() as MediaDisplayMode) : 'image';
  const [mediaDisplayMode, setMediaDisplayMode] = useState(initialMediaDisplayMode);

  const users = useAppSelector((state) => state.users?.entities);
  const [creator, setCreator] = useState({} as UserDto);
  useEffect(() => {
    const primaryAuthor = Array.isArray(author) ? author[0] : author;
    const user = findInArray(users, 'username', primaryAuthor);
    setCreator(user);
  }, [users]);

  const DisplayPreviewOrVideo = () => {
    const { imageSrc, isDefaultImage } = usePreviewImage(thumbnail);
    return mediaDisplayMode === 'image' && !isDefaultImage ? (
      <ImageBackground source={{ uri: imageSrc }} resizeMode="cover" style={{ width: '100%', height: 250 }}>
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
      <>
        {/* This react-native-video version doesn't work with web and the lib has over a thousand open issues */}
        {/*<Video
          source={{ uri: mediaSrc }}
          poster={thumbnail || DEFAULT_IMAGE}
          style={{ width: '100%', height: 300, margin: 3, marginBottom: 6 }}
          resizeMode="contain"
          controls={true}
          paused={true}
        />*/}
        {/* Use expo-av + expo-video-player */}
        <Video
          style={{
            height: 300,
          }}
          videoProps={{
            shouldPlay: false, // Pause by default
            resizeMode: ExpoVideo.RESIZE_MODE_CONTAIN,
            // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
            source: {
              uri: mediaSrc,
            },
          }}
        />
      </>
    ) : null;
  };

  const TopDrawer = topDrawer;

  return isEdit ? (
    <View>
      {showThumbnail && <DisplayPreviewOrVideo key={mediaSrc} />}
      {topDrawer && <TopDrawer />}
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <TextField
          label="Title"
          value={title}
          error={title && titleValidator(title)}
          onChangeText={(text) => onTitleChange(text)}
          disabled={isReadOnly}
        />
        <TextField
          multiline={true}
          label="Description"
          value={description}
          numberOfLines={5}
          error={title && descriptionValidator(description)}
          onChangeText={(text) => onDescriptionChange(text)}
          disabled={isReadOnly}
        />
        <Card elevation={elevation}>
          {/* <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 13 }}>Select Content Type</Text> */}
          <SwitchSelector
            fontSize={13}
            textColor={theme.colors.text}
            selectedColor={theme.colors.primary}
            backgroundColor={theme.colors.background}
            buttonColor={theme.colors.darkDefault}
            style={{ margin: 0, padding: 0, width: '100%' }}
            options={categoryOptions.map((option) => ({ value: option, label: option }))}
            initial={categoryOptions.findIndex((option) => option.toLowerCase() === category.toLowerCase())}
            onPress={(value) => onCategoryChange(value as string)}
            disabled={isReadOnly}
            borderRadius={3}
          />
        </Card>
        <View>{children}</View>
      </View>
    </View>
  ) : (
    <Card style={styles.card} elevation={elevation}>
      <DisplayPreviewOrVideo />
      {/* Had to use actual text spaces to space this out for some reason not going to look into it now... */}
      <Card.Title
        style={{ marginTop: 25 }}
        title={<Title>{title}</Title>}
        titleStyle={styles.title}
        // TODO: Stupid component doesn't render right on Android if we use a View to wrap, but then the whole f*cking thing appears on a single line!
        subtitle={
          <View style={styles.subtitle}>
            <Text style={styles.author}>By {getAuthorText(creator)}</Text>
            <Text style={styles.username}>{getUsername(creator)}</Text>
          </View>
        }
        subtitleStyle={styles.subtitle}
        leftStyle={styles.avatar}
        left={() =>
          showThumbnail &&
          creator?.imageSrc && (
            <View>
              <Avatar.Image source={{ uri: creator?.imageSrc || DEFAULT_AVATAR }} size={52} />
            </View>
          )
        }
        right={(buttonProps: any) => showActions && <IconButton {...buttonProps} icon="more-vert" onPress={onActionsClicked} />}
      />
      {!showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 30 }}>
          <Paragraph style={styles.description}>{description}</Paragraph>
          {showThumbnail && thumbnail && <Card.Cover source={{ uri: thumbnail }} />}
          {children}
        </Card.Content>
      )}
      {showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 10 }}>
          <Paragraph style={styles.descriptionWithSocial}>{description}</Paragraph>
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
      setMediaDisplayMode('image');
    } else if (current === 'image') {
      setMediaDisplayMode('video');
    }
  }
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  author: {
    fontSize: 12,
  },
  username: {
    color: theme.colors.primary,
    fontSize: 12,
  },
  description: {
    marginBottom: 15,
    fontSize: 13,
  },
  descriptionWithSocial: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 13,
  },
  card: {
    paddingTop: 5,
    margin: 0,
  },
});
