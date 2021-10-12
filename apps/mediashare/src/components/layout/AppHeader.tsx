import React, { useState } from 'react';
import { Appbar, Searchbar } from 'react-native-paper';

import { theme } from '../../styles';

export const AppHeader = (props) => {
  const { options, previous, navigation, searchable = false } = props;

  const [searchIsActive, setSearchIsActive] = useState(false);
  const title = options?.headerTitle !== undefined ? options?.headerTitle : options?.title !== undefined ? options?.title : '';

  const enableSearch = () => setSearchIsActive(true);
  const disableSearch = () => setSearchIsActive(false);

  const placeholder = 'Enter Text';

  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text) => setSearchText(text);

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.accent }}>
      {searchable && searchIsActive && (
        <>
          <Searchbar
            style={{ width: '100%' }}
            placeholder={placeholder}
            value={searchText}
            onChangeText={(text) => updateSearchText(text)}
            onIconPress={() => disableSearch()}
            icon="arrow-back-ios"
            clearIcon="clear"
          />
          <Appbar.Action icon="close" onPress={() => disableSearch()} />
        </>
      )}
      {searchable && !searchIsActive && (
        <>
          {previous && <Appbar.BackAction color="#ffffff" onPress={navigation.goBack} />}
          <Appbar.Content title={title} titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, paddingLeft: '15%' }} />
          <Appbar.Action icon="search" color="#ffffff" onPress={() => enableSearch()} />
        </>
      )}
      {!searchable && (
        <>
          {previous && <Appbar.BackAction color="#ffffff" onPress={navigation.goBack} />}
          <Appbar.Content title={title} titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, paddingRight: previous ? '15%' : 0 }} />
        </>
      )}
    </Appbar.Header>
  );
};
