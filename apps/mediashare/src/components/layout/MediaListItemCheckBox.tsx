import * as React from 'react';
import { Text, Left, Body, ListItem, CheckBox, Thumbnail } from 'native-base';
import { MediaListItemProps } from './MediaListItem';
import { useState } from 'react';

export interface MediaListItemCheckBoxProps extends MediaListItemProps {
  checked?: boolean;
  changeChecked: (bool) => void;
}

export const MediaListItemCheckBox: React.FC<MediaListItemCheckBoxProps> = (props) => {
  const { title, description, image, selectable = true } = props;
  const [checked, setChecked] = useState(props.checked);
  function changeChecked(bool) {
    props.changeChecked(bool);
    setChecked(bool);
  }
  return (
    <ListItem style={{ borderWidth: 0 }}>
      {selectable && (
        <Left>
          <CheckBox color="black" checked={checked || false} onPress={() => changeChecked(!checked)} />
        </Left>
      )}
      <Left style={{ width: '20%', flex: 1 }}>
        <Thumbnail square source={{ uri: image }} />
      </Left>
      <Body
        style={{
          flex: 4,
          width: '60%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderWidth: 0,
        }}
      >
        <Text style={{ borderWidth: 0 }}>{title}</Text>
        <Text note numberOfLines={2} style={{ color: 'black' }}>
          {description}
        </Text>
      </Body>
      {/* {showActions === true && (
        <Right style={{ width: '10%', flex: 1 }}>
          <Button transparent onPress={() => changeChecked(checked)}>
            <Icon name="chevron-forward-outline" />
          </Button>
        </Right>
      )} */}
    </ListItem>
  );
};
