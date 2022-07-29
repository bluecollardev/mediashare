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
  sortIndex?: string;
  showSocial?: any | boolean;
  showActions?: boolean;
  showDescription?: boolean;
  showAvatar?: boolean;
  showThumbnail?: boolean;
  thumbnail?: string;
  thumbnailStyle?: any;
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
  onSortIndexChange?: (value: string) => void;
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
  sortIndex = undefined as string,
  mediaSrc,
  showSocial = false,
  showActions = false,
  showDescription = true,
  showAvatar = true,
  showThumbnail = true,
  thumbnail = null,
  thumbnailStyle,
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
  onSortIndexChange = (value: string) => {},
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

  const showMediaPreview = showThumbnail && (!!thumbnail || !!mediaSrc);

  return isEdit ? (
    <View>
      {showMediaPreview && (
        <DisplayPreviewOrVideo
          key={mediaSrc}
          mediaSrc={mediaSrc}
          isPlayable={isPlayable}
          showThumbnail={showThumbnail}
          thumbnail={thumbnail}
          style={thumbnailStyle}
        />
      )}
      {topDrawer && <TopDrawer />}
      <View style={defaultStyles.container}>
        <Card elevation={elevation as any} style={{ marginTop: 25, marginBottom: 15 }}>
          <TextField
            label="Title"
            value={title}
            multiline={true}
            error={title && titleValidator(title)}
            onChangeText={(text) => onTitleChange(text)}
            disabled={isReadOnly}
          />
        </Card>
        {sortIndex !== undefined && (
          <Card elevation={elevation as any} style={{ marginBottom: 15 }}>
            <TextField
              keyboardType="numeric"
              style={{ backgroundColor: theme.colors.surface, fontSize: 15 }}
              multiline={true}
              label="Sort Index"
              value={sortIndex}
              numberOfLines={1}
              onChangeText={(textValue) => onSortIndexChange(textValue.replace(/[^0-9]/g, ''))}
              disabled={isReadOnly}
            />
          </Card>
        )}
        <Card elevation={elevation as any} style={{ marginBottom: 15 }}>
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
        <Card
          elevation={elevation as any}
          style={{ position: 'relative', marginBottom: 25, borderColor: theme.colors.defaultBorder, borderWidth: 1, padding: 0.5 }}
        >
          <SwitchSelector
            fontSize={13}
            textColor={theme.colors.text}
            borderColor={theme.colors.darkDefault}
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
        <Card elevation={elevation as any} style={{ marginTop: 25, marginBottom: 25 }}>
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
    <Card style={defaultStyles.card} elevation={elevation as any}>
      {showMediaPreview && (
        <DisplayPreviewOrVideo
          key={mediaSrc}
          mediaSrc={mediaSrc}
          isPlayable={isPlayable}
          showThumbnail={showThumbnail}
          thumbnail={thumbnail}
          style={thumbnailStyle}
        />
      )}
      {/* Had to use actual text spaces to space this out for some reason not going to look into it now... */}
      <MediaCardTitle
        title={title}
        authorProfile={authorProfile}
        showThumbnail={showAvatar}
        showActions={showActions}
        onActionsClicked={onActionsClicked}
        style={!showMediaPreview ? { marginTop: 0 } : {}}
      />
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
  card: {
    paddingTop: 5,
    margin: 0,
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
});
