import React from 'react';
import { Text, Button, Icon, Left, Body, Right, CardItem, Card, View, Input, Textarea, Picker, Item, Image } from 'native-base';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

export interface MediaListItemProps {
  mediaSrc?: string | null;
  title?: string;
  author?: string;
  description?: string;
  showSocial?: any | boolean;
  buttons?: any | boolean;
  content?: any;
  showActions?: boolean;
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
    onActionsClicked = () => {},
    children,
    category = '',
    isEdit = false,
    onTitleChange = (v: string) => {},
    onDescriptionChange = (v: string) => {},
    onCategoryChange = (v: string) => {},
    categoryOptions = [],
  } = props;

  return (
    <Card style={{ flex: 0 }}>
      {mediaSrc && (
        <CardItem cardBody>
          <Video source={{ uri: mediaSrc }} poster={DEFAULT_IMAGE} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />
        </CardItem>
      )}

      {children}

      <CardItem>
        <Body>
          {isEdit ? (
            <Item regular>
              <Input value={title} onChange={(e) => onTitleChange(e.nativeEvent.text)} />
            </Item>
          ) : (
            <Text>{title}</Text>
          )}
          <Text style={{ fontSize: 12, color: 'grey' }}>{author} </Text>
          {isEdit ? (
            <Item regular>
              <Picker
                iosIcon={<Icon name="chevron-down" />}
                style={{ width: undefined }}
                placeholder="Category"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={category}
                onValueChange={(e) => onCategoryChange(e)}
              >
                {categoryOptions.map((option) => (
                  <Picker.Item label={option} key={option} value={option} />
                ))}
              </Picker>
            </Item>
          ) : (
            <Text style={{ fontSize: 12, color: 'grey' }}>{category}</Text>
          )}
        </Body>
        {showActions && (
          <Right>
            <Button transparent onPress={onActionsClicked}>
              <Icon name="ellipsis-vertical" />
            </Button>
          </Right>
        )}
      </CardItem>
      <CardItem>
        {isEdit ? (
          <Textarea rowSpan={5} style={{ width: '100%' }} bordered onChange={(e) => onDescriptionChange(e.nativeEvent.text)} value={description} />
        ) : (
          <Text note numberOfLines={3} style={{ color: 'black' }}>
            {description}
          </Text>
        )}
      </CardItem>
      {buttons && typeof buttons === 'function' && (
        <View padder style={{ flexDirection: 'row' }}>
          {buttons()}
        </View>
      )}

      {showSocial === true && (
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up-outline" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles-outline" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Button transparent>
              <Icon active name="arrow-redo-outline" />
              <Text>3 Shares</Text>
            </Button>
          </Right>
        </CardItem>
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
});
