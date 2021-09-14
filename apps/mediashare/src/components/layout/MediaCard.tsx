import React from 'react';

import { Card, Chip, IconButton, Paragraph, TextInput, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import SwitchSelector from 'react-native-switch-selector';
import { categoryValidator, descriptionValidator, titleValidator } from './formConfig';

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
      {mediaSrc && <Video source={{ uri: mediaSrc }} poster={DEFAULT_IMAGE} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />}
      {children}
      {isEdit ? (
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
      ) : (
        <Card.Content>
          <Card.Title
            title={<Title>{title}</Title>}
            subtitle={`Tags: ${category ?? 'None'}`}
            right={(props: any) => showActions && <IconButton {...props} icon="more-vert" onPress={onActionsClicked} />}
          />
          <Card.Content>
            <Paragraph style={{ marginTop: 2, marginBottom: 5 }}>{description}</Paragraph>
          </Card.Content>
        </Card.Content>
      )}
    </Card>
    // <Card style={{ flex: 0 }}>
    //   {mediaSrc && (
    //     <CardItem cardBody>
    //       <Video source={{ uri: mediaSrc }} poster={DEFAULT_IMAGE} style={{ width: '100%', height: 300 }} resizeMode="cover" controls={true} />
    //     </CardItem>
    //   )}

    //   {children}

    //   <CardItem style={{ marginTop: 10 }}>
    //     <Body>
    //       {isEdit ? (
    //         <Item regular style={{ marginBottom: 10 }}>
    //           <Input value={title} onChange={(e) => onTitleChange(e.nativeEvent.text)} />
    //         </Item>
    //       ) : (
    //         <Text>{title}</Text>
    //       )}
    //       {/* <Text style={{ fontSize: 12, color: 'grey' }}>{author} </Text> */}
    //       {isEdit && (
    //         <Item regular>
    //           <Picker
    //             iosIcon={<Icon name="chevron-down" />}
    //             style={{ width: undefined }}
    //             placeholder="Category"
    //             placeholderStyle={{ color: '#bfc6ea' }}
    //             placeholderIconColor="#007aff"
    //             selectedValue={category}
    //             onValueChange={(e) => onCategoryChange(e)}
    //           >
    //             {categoryOptions.map((option) => (
    //               <Picker.Item label={option} key={option} value={option} />
    //             ))}
    //           </Picker>
    //         </Item>
    //       )}
    //       {!isEdit && !!category && (
    //         <Text style={{ fontSize: 12, color: 'grey', borderColor: 'grey', borderStyle: 'solid', borderWidth: 1, borderRadius: 3, padding: 3, marginTop: 5 }}>
    //           {category}
    //         </Text>
    //       )}
    //     </Body>
    //     {showActions && (
    //       <Right>
    //         <Button transparent onPress={onActionsClicked}>
    //           <Icon name="ellipsis-vertical" />
    //         </Button>
    //       </Right>
    //     )}
    //   </CardItem>
    //   <CardItem style={{ marginBottom: 20 }}>
    //     {isEdit ? (
    //       <Textarea rowSpan={5} style={{ width: '100%' }} bordered onChange={(e) => onDescriptionChange(e.nativeEvent.text)} value={description} />
    //     ) : (
    //       <Text note numberOfLines={3} style={{ color: 'black', marginBottom: 20 }}>
    //         {description}
    //       </Text>
    //     )}
    //   </CardItem>
    //   {buttons && typeof buttons === 'function' && (
    //     <View style={{ flexDirection: 'row' }}>
    //       {buttons()}
    //     </View>
    //   )}

    //   {showSocial === true && (
    //     <CardItem>
    //       <Left>
    //         <Button transparent>
    //           <Icon active name="thumbs-up-outline" />
    //           <Text>12 Likes</Text>
    //         </Button>
    //       </Left>
    //       <Body>
    //         <Button transparent>
    //           <Icon active name="chatbubbles-outline" />
    //           <Text>4 Comments</Text>
    //         </Button>
    //       </Body>
    //       <Right>
    //         <Button transparent>
    //           <Icon active name="arrow-redo-outline" />
    //           <Text>3 Shares</Text>
    //         </Button>
    //       </Right>
    //     </CardItem>
    //   )}
    // </Card>
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
