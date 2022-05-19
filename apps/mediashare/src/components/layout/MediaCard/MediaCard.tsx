import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import SwitchSelector from 'react-native-switch-selector';
import { TextField, MultiSelectIcon } from 'mediashare/components/form';
import { DisplayPreviewOrVideo } from './DisplayPreviewOrVideo';
import { MediaCardTitle } from './MediaCardTitle';
import { MediaCardTags } from './MediaCardTags';
import { MediaCardSocial } from './MediaCardSocial';
import { mappedKeysToTags } from 'mediashare/core/utils/tags';
import { titleValidator, descriptionValidator } from 'mediashare/core/utils/validators';
import { theme, components } from 'mediashare/styles';

import { AuthorProfileDto } from 'mediashare/rxjs-api';

export interface MediaCardProps {
  id?: string;
  title?: string;
  authorProfile?: AuthorProfileDto;
  description?: string;
  showSocial?: any | boolean;
  showActions?: boolean;
  showDescription?: boolean;
  showThumbnail?: boolean;
  thumbnail?: string;
  mediaSrc?: string | null;
  category?: string;
  // TODO: Fix Tag type
  // availableTags?: Tag[];
  availableTags?: any[];
  tags?: any[];
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

export const MediaCard: React.FC<MediaCardProps> = ({
  title = '',
  authorProfile = {} as AuthorProfileDto,
  description = '',
  mediaSrc,
  showSocial = false,
  showActions = false,
  showDescription = true,
  showThumbnail = true,
  thumbnail = null,
  onActionsClicked = () => {},
  children,
  topDrawer = undefined,
  category = 'None',
  // TODO: Fix Tag type
  // availableTags = [] as Tag[],
  availableTags = [] as any[],
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const onSelectedCategoriesChange = (categories) => {
    setSelectedCategories(categories);
    onCategoryChange(categories);
  };

  const mappedSelectedTags = useMemo(() => mappedKeysToTags(tags, availableTags), []);
  const mappedSelectedTagKeys = useMemo(() => {
    return mappedSelectedTags.map(({ key }) => key);
  }, []);
  const [selectedTagKeys, setSelectedTagKeys] = useState(mappedSelectedTagKeys);
  const onSelectedTagsChange = (newTags) => {
    setSelectedTagKeys(newTags);
    onTagChange(newTags);
  };

  const TopDrawer = topDrawer;

  return isEdit ? (
    <View>
      {showThumbnail && (
        <DisplayPreviewOrVideo key={mediaSrc} mediaSrc={mediaSrc} isPlayable={isPlayable} showThumbnail={showThumbnail} thumbnail={thumbnail} />
      )}
      {topDrawer && <TopDrawer />}
      <View style={defaultStyles.container}>
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
            colors={components.multiSelect.colors}
            styles={components.multiSelect.styles}
            items={availableTags}
            IconRenderer={MultiSelectIcon}
            uniqueKey="key"
            displayKey="value"
            subKey="children"
            searchPlaceholderText="Enter Text"
            selectText="Select Tags"
            confirmText="Done"
            onSelectedItemsChange={onSelectedTagsChange}
            selectedItems={selectedTagKeys}
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
            backgroundColor={theme.colors.surface}
            buttonColor={theme.colors.surface}
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
        <Card elevation={elevation} style={{ marginTop: 25, marginBottom: 25 }}>
          <TextField
            style={{ height: 500, overflow: 'scroll', backgroundColor: theme.colors.surface, fontSize: 15 }}
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
      <DisplayPreviewOrVideo key={mediaSrc} mediaSrc={mediaSrc} isPlayable={isPlayable} showThumbnail={showThumbnail} thumbnail={thumbnail} />
      {/* Had to use actual text spaces to space this out for some reason not going to look into it now... */}
      <MediaCardTitle title={title} authorProfile={authorProfile} showThumbnail={true} showActions={showActions} onActionsClicked={onActionsClicked} />
      <Card.Content style={{ marginBottom: 15 }}>
        <MediaCardTags tags={mappedSelectedTags} />
      </Card.Content>
      <Card.Content style={{ marginTop: 0, marginBottom: 30 }}>
        {showSocial && <MediaCardSocial likes={likes} shares={shares} views={views} />}
        {children}
        {showDescription && <Paragraph style={showSocial ? defaultStyles.descriptionWithSocial : defaultStyles.description}>{description}</Paragraph>}
      </Card.Content>
    </Card>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  avatar: {
    width: 50,
  },
  title: {
    marginBottom: 4,
  },
  titleText: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.medium.fontFamily,
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  createdBy: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  author: {
    color: theme.colors.text,
    fontFamily: theme.fonts.thin.fontFamily,
    fontSize: 13,
    marginBottom: 2,
  },
  username: {
    color: theme.colors.textDarker,
    fontFamily: theme.fonts.thin.fontFamily,
    fontSize: 13,
    marginBottom: 2,
    marginLeft: 2,
  },
  description: {
    marginBottom: 15,
    fontSize: 15,
    color: theme.colors.text,
    fontFamily: theme.fonts.thin.fontFamily,
  },
  descriptionWithSocial: {
    marginTop: 15,
    marginBottom: 30,
    fontSize: 15,
    color: theme.colors.text,
    fontFamily: theme.fonts.thin.fontFamily,
  },
  card: {
    paddingTop: 5,
    margin: 0,
  },
});
