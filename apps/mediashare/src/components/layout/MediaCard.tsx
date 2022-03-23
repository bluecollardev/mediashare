import React, { useEffect, useState, useMemo } from 'react';

import { Avatar, Button, Card, Chip, Divider, IconButton, Paragraph, Title, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native';

import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Video from 'react-native-video'; // TODO: Not compatible with react-native-web
// import { Video as ExpoVideo } from 'expo-av';
// import Video from 'expo-video-player';

import SwitchSelector from 'react-native-switch-selector';
import { descriptionValidator, titleValidator } from './formConfig';
import { MultiSelectIcon } from '../form/MultiSelect';
import { TextField } from '../form/TextField';
export const DEFAULT_AVATAR = 'https://i.pinimg.com/originals/db/fa/08/dbfa0875b8925919a3f16d53d9989738.png';

// import { TagKeyValue, UserDto } from '../../rxjs-api';
import { useAppSelector } from '../../store';
import { findInArray, getAuthorText, getUsername } from '../../utils';
import { usePreviewImage } from '../../hooks/usePreviewImage';
import { theme } from '../../styles';

// import { customMediaTags, customMediaSubtags, customPlaylistTags, customPlaylistSubtags } from '../../data/tags';
import { UserDto, Tag } from '../../rxjs-api/models';

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
  availableTags?: Tag[];
  tags?: string[];
  children?: any;
  topDrawer?: React.FC<any>;
  isEdit?: boolean;
  isPlayable?: boolean;
  isReadOnly?: boolean;
  onActionsClicked?: () => void;
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onTagChange?: (value: string) => void;
  tagOptions?: any[];
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
  availableTags = [] as Tag[],
  tags = [],
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTagChange = (value: string) => {},
  tagOptions = [],
  likes = 0,
  views = 0,
  shares = 0,
}: MediaCardProps) => {
  console.log('MediaCard tags');
  console.log(tags);
  const getMediaDisplayMode = () => (showThumbnail && thumbnail ? 'image' : 'video');
  const initialMediaDisplayMode = isPlayable ? (getMediaDisplayMode() as MediaDisplayMode) : 'image';
  const [mediaDisplayMode, setMediaDisplayMode] = useState(initialMediaDisplayMode);

  const users = useAppSelector((state) => state.users?.entities);
  const [creator, setCreator] = useState({} as UserDto);
  useEffect(() => {
    const primaryAuthor = Array.isArray(author) ? author[0] : author;
    const user = findInArray(users, 'username', primaryAuthor);
    setCreator(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const onSelectedCategoriesChange = (categories) => {
    setSelectedCategories(categories);
    onCategoryChange(categories);
  };

  const [selectedTags, setSelectedTags] = useState(tags);
  const onSelectedTagsChange = (tags) => {
    setSelectedTags(tags);
    onTagChange(tags);
  };

  const availableMediaTags = useMemo(
    () =>
      [...availableTags]
        .filter((tag) => tag?.isMediaTag)
        .map((tag) => ({
          id: tag?.key,
          name: tag?.value,
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const availablePlaylistTags = useMemo(
    () =>
      [...availableTags]
        .filter((tag) => tag.isPlaylistTag)
        .map((tag) => ({
          id: tag?.key,
          name: tag?.value,
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
        <Video
          source={{ uri: mediaSrc }}
          poster={imageSrc}
          style={{ width: '100%', height: 300, margin: 3, marginBottom: 6 }}
          resizeMode="contain"
          controls={true}
          paused={false}
        />
        {/* Use expo-av + expo-video-player */}
        {/* <Video
          styles={{
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
        /> */}
      </>
    ) : null;
  };

  const TopDrawer = topDrawer;

  return isEdit ? (
    <View>
      {showThumbnail && <DisplayPreviewOrVideo key={mediaSrc} />}
      {topDrawer && <TopDrawer />}
      <View style={{ marginBottom: 25 }}>
        <Card elevation={elevation} style={{ marginTop: 25, marginBottom: 0 }}>
          <TextField
            label="Title"
            value={title}
            multiline={true}
            error={title && titleValidator(title)}
            onChangeText={(text) => onTitleChange(text)}
            disabled={isReadOnly}
          />
        </Card>
        <Card elevation={elevation} style={{ marginBottom: 25 }}>
          <SectionedMultiSelect
            colors={{
              primary: theme.colors.primary,
              text: '#fff',
              subText: '#fff',
              searchPlaceholderTextColor: '#fff',
              selectToggleTextColor: '#fff',
              searchSelectionColor: '#fff',
              itemBackground: 'transparent',
              subItemBackground: 'transparent',
            }}
            styles={{
              searchTextInput: {
                color: '#fff',
              },
              searchBar: {
                backgroundColor: '#000',
              },
              container: {
                backgroundColor: '#000',
              },
              selectToggle: {
                marginVertical: 10,
                paddingLeft: 15,
                paddingRight: 10,
                borderWidth: 1,
                borderColor: theme.colors.defaultBorder,
              },
              chipContainer: {
                marginTop: 10,
              },
            }}
            items={availableMediaTags}
            IconRenderer={MultiSelectIcon}
            uniqueKey="id"
            subKey="children"
            searchPlaceholderText="Enter Text"
            selectText="Select Tags"
            confirmText="Done"
            onSelectedItemsChange={onSelectedTagsChange}
            selectedItems={selectedTags}
            expandDropDowns={false}
            readOnlyHeadings={false}
            showDropDowns={true}
            parentChipsRemoveChildren={true}
            showCancelButton={true}
            modalWithTouchable={false}
            modalWithSafeAreaView={false}
          />
        </Card>
        <Card elevation={elevation} style={{ position: 'relative', marginBottom: 25, borderColor: theme.colors.defaultBorder, borderWidth: 1, padding: 0.5 }}>
          <SwitchSelector
            fontSize={13}
            textColor={theme.colors.text}
            borderColor={theme.colors.defaultBorder}
            selectedColor={theme.colors.primary}
            backgroundColor={theme.colors.background}
            buttonColor={theme.colors.darkDefault}
            style={{ margin: 0, padding: 0, width: '100%' }}
            options={categoryOptions.map((option) => ({ value: option, label: `${option} Content` }))}
            initial={categoryOptions.findIndex((option) => option.toLowerCase() === category.toLowerCase())}
            onPress={(value) => onSelectedCategoriesChange(value as string)}
            disabled={isReadOnly}
            borderRadius={3}
          />
        </Card>
        <View>{children}</View>
        {/* Description can be the longest field so we've moved it to last when we're in edit mode */}
        <Card elevation={elevation} style={{ marginBottom: 25 }}>
          <TextField
            style={{ height: 500, overflow: 'scroll' }}
            multiline={true}
            label="Description"
            value={description}
            numberOfLines={10}
            error={title && descriptionValidator(description)}
            onChangeText={(text) => onDescriptionChange(text)}
            disabled={isReadOnly}
          />
        </Card>
      </View>
    </View>
  ) : (
    <Card style={defaultStyles.card} elevation={elevation}>
      <DisplayPreviewOrVideo />
      {/* Had to use actual text spaces to space this out for some reason not going to look into it now... */}
      <Card.Title
        style={{ marginTop: 25, marginBottom: 25 }}
        title={<Title style={defaultStyles.titleText}>{title}</Title>}
        titleStyle={defaultStyles.title}
        // TODO: Stupid component doesn't render right on Android if we use a View to wrap, but then the whole f*cking thing appears on a single line!
        subtitle={
          <View style={defaultStyles.subtitle}>
            <Text style={defaultStyles.author}>By {getAuthorText(creator)}</Text>
            <Text style={defaultStyles.username}>{getUsername(creator)}</Text>
          </View>
        }
        subtitleStyle={defaultStyles.subtitle}
        leftStyle={defaultStyles.avatar}
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
      <Card.Content style={{ marginBottom: 25 }}>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {Array.isArray(selectedTags) &&
            selectedTags.length > 0 &&
            selectedTags.map((selectedTagKey, idx) => {
              const mappedTag = availableMediaTags.find(({ id }) => id === selectedTagKey);
              return (
                <View key={`${selectedTagKey}_${idx}`} style={{ flex: 0, marginLeft: 3, marginRight: 3 }}>
                  <Chip>{mappedTag?.name || 'Unknown'}</Chip>
                </View>
              );
            })}
        </View>
      </Card.Content>
      {!showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 30 }}>
          {showThumbnail && thumbnail && <Card.Cover source={{ uri: thumbnail }} />}
          {children}
          <Divider />
          <Paragraph style={defaultStyles.description}>{description}</Paragraph>
        </Card.Content>
      )}
      {showSocial && (
        <Card.Content style={{ marginTop: 0, marginBottom: 10 }}>
          <View style={{ marginBottom: 0 }}>
            <SocialButtons likes={likes} shares={shares} views={views} />
          </View>
          {children}
          <Paragraph style={defaultStyles.descriptionWithSocial}>{description}</Paragraph>
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

const defaultStyles = StyleSheet.create({
  avatar: {
    width: 50,
  },
  title: {
    marginBottom: 4,
  },
  titleText: {
    color: theme.colors.text,
    fontSize: 16,
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
